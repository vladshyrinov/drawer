const Drawer = (function () {
  let rootInstance = null;

  function render(element, parentDom) {
    let prevInstance = rootInstance;
    let nextInstance = reconcile(parentDom, prevInstance, element);
    rootInstance = nextInstance;
  }

  function createElement(type, attributes, ...args) {
    const props = Object.assign({}, attributes);
    const children = args.length > 0 ? [].concat(...args) : [];
    const isNotTextChild = child => child instanceof Object;
    props.children = children
      .filter(child => child != null && child !== false)
      .map((child) => {
        return isNotTextChild(child) ? child : createTextElement(child);
      });
    return { type, props };
  }

  function createTextElement(text) {
    return {
      type: "TEXT ELEMENT",
      props: { nodeValue: text }
    };
  }

  function instantiate(element) {
    const { type, props } = element;

    const isDomElement = typeof type === "string";
    if (isDomElement) {
      // Create dom element
      const isTextNode = type === "TEXT ELEMENT";
      const dom = isTextNode ? document.createTextNode("") : document.createElement(type);

      updateDomProperties(dom, [], props);

      // Add event lsiteners
      const isListener = name => name.startsWith("on") && typeof props[name] === "function";
      Object.keys(props).filter(isListener).forEach(name => {
        dom.addEventListener(name.toLowerCase().slice(2), props[name]);
      });

      // Set attributes
      const isChildren = name => name === "children";
      const isAttribute = name => !isListener(name) && !isChildren(name);
      Object.keys(props).filter(isAttribute).forEach(name => {
        dom[name] = props[name];
      });

      // Instantiate and append children
      const childElements = props.children || [];
      const childInstances = childElements.map(instantiate);
      const childDoms = childInstances.map(childInstance => childInstance.dom);
      childDoms.forEach(childDom => dom.appendChild(childDom));

      const instance = { dom, element, childInstances };

      return instance;
    } else {
      const isClass = !!type.prototype.render;

      const instance = {};
      if (isClass) {
        const publicInstance = createPublicInstance(element, instance);
        const childElement = publicInstance.render();

        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;
        componentDidMount(publicInstance);
        
        Object.assign(instance, { dom, element, childInstance, publicInstance });
      } else {
        const childElement = type(props);
        const childInstance = instantiate(childElement);
        const dom = childInstance.dom;
        Object.assign(instance, { dom, element, childInstance });
      }

      return instance;
    }
  }

  function reconcile(parentDom, instance, element, prevState) {
    if (instance == null) {
      // Create instance
      const newInstance = instantiate(element);
      parentDom.appendChild(newInstance.dom);
      return newInstance;
    } else if (element == null) {
      // Remove instance
      componentWillUnmount(instance);
      parentDom.removeChild(instance.dom);
      return null;
    } else if (instance.element.type !== element.type) {
      // Replace instance
      const newInstance = instantiate(element);
      componentWillUnmount(instance);
      parentDom.replaceChild(newInstance.dom, instance.dom);
      return newInstance;
    } else if (typeof element.type === "string") {
      // Update dom instance
      updateDomProperties(instance.dom, instance.element.props, element.props);
      instance.childInstances = reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    } else {
      //Update composite instance
      const prevProps = {...instance.publicInstance.props};
      if (!prevState) {
        prevState = {...instance.publicInstance.state};
      }

      instance.publicInstance.props = element.props;
      const childElement = instance.publicInstance.render();
      componentDidUpdate(instance.publicInstance, prevProps, prevState);
      const oldChildInstance = instance.childInstance;
      const childInstance = reconcile(parentDom, oldChildInstance, childElement);
      instance.dom = childInstance.dom;
      instance.childInstance = childInstance;
      instance.element = element;
      return instance;
    }
  }

  function componentDidMount(publicInstance) {
    if (publicInstance.componentDidMount) {
      publicInstance.componentDidMount();
    }
  }

  function componentWillUnmount(instance) {
    if (instance.publicInstance && instance.publicInstance.componentWillUnmount) {
      instance.publicInstance.componentWillUnmount();
    }
  }

  function componentDidUpdate(publicInstance, prevProps, prevState) {
    if (publicInstance.componentDidUpdate) {
      publicInstance.componentDidUpdate(prevProps, prevState);
    }
  }

  function updateDomProperties(dom, prevProps, nextProps) {
    // delete prev listeners
    const isPrevListener = name => name.startsWith("on") && typeof prevProps[name] === "function";
    Object.keys(prevProps).filter(isPrevListener).forEach(name => {
      dom.removeEventListener(name.toLowerCase().slice(2), prevProps[name]);
    });

    // update listeners
    const isListener = name => name.startsWith("on") && typeof nextProps[name] === "function";
    Object.keys(nextProps).filter(isListener).forEach(name => {
      dom.addEventListener(name.toLowerCase().slice(2), nextProps[name]);
    });

    const isChildren = name => name === "children";
    const isPrevAttribute = name => !isPrevListener(name) && !isChildren(name);
    Object.keys(prevProps).filter(isPrevAttribute).forEach(name => {
      delete dom[name];
    });

    const isAttribute = name => !isListener(name) && !isChildren(name);
    Object.keys(nextProps).filter(isAttribute).forEach(name => {
      dom[name] = nextProps[name];
    });
  }

  function reconcileChildren(instance, element) {
    const dom = instance.dom;
    const childInstances = instance.childInstances;
    const nextChildElements = element.props.children || [];
    // console.log("childInstances: ", instance.childInstances);
    // console.log("nextChildElements: ", element.props.children);
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);
    for (let i = 0; i < count; i++) {
      const childInstance = childInstances[i];
      const childElement = nextChildElements[i];
      const newChildInstance = reconcile(dom, childInstance, childElement);
      newChildInstances.push(newChildInstance);
    }
    return newChildInstances;
  }

  class Component {
    constructor(props) {
      this.props = props,
        this.state = this.state || {}
    }

    setState(updater, callbackFn) {
      const prevState = {...this.state};
      const props = {...this.props}
      
      if (typeof updater === "function") {
        updater = updater(prevState, props)
      }
      
      this.state = {
        ...this.state,
        ...updater
      }

      updateInstance(this.__internalInstance, prevState);
      if (typeof callbackFn === "function") {
        callbackFn();
      }
    }
  }

  function createPublicInstance(element, internalInstance) {
    const { type, props } = element;
    const publicInstance = new type(props);
    publicInstance.__internalInstance = internalInstance;
    return publicInstance;
  }

  function updateInstance(internalInstance, prevState) {
    const parentDom = internalInstance.dom.parentNode;
    const element = internalInstance.element;
    reconcile(parentDom, internalInstance, element, prevState);
  }

  return {
    createElement,
    render, 
    Component
  }

}())

export default Drawer;