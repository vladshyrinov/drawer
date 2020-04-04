# Drawer 

It is an implementation of React library (version before 16.8) created based on tutorial by Rodrigo Pombo plus added own features

## Motivation

To better undestand principles, that lie inside the React library

## API

#### Drawer.createElement

transforms HTML or React element like 

'''html
    <div id="container">
        <input value="foo" type="text"> 
        <a href="/bar">Bar</a>
        <span>      
    </div> 
'''

into JS Object

'''js
    const element = {
    type: "div",
    props: {
        id: "container",
        children: [
            { type: "input", props: { value: "foo", type: "text" } },
            { type: "a", props: { href: "/bar" }, 
            children: [ {
                type: "TEXT ELEMENT",
                props: { nodeValue: Bar }
            } ] }
        ]
    }
};
'''

#### Drawer.render

renders JS Object into parent DOM

'''js
    render(element, document.getElementById("root"));
'''

#### Drawer.Component

is a base class to create React class components

## Implemented features

- Class component
- Functional component
- Lifecycle hooks:
-- componentDidMount
-- componentDidUpdate
-- componentWillUnmount

## Usage

see example [here](example-app)






