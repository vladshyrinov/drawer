/* @jsx Drawer.createElement */

import Drawer from '../drawer/drawer';

class Book extends Drawer.Component{
    constructor(props) {
        console.log("constructor");
        super(props);

        this.state = {
            name: 'Hello World'
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    render(){
        console.log("render");
        return(
            <div>
                <h1>{this.state.name}</h1>
            </div>
        )
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
}

export default Book;