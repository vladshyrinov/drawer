/* @jsx Drawer.createElement */

import Drawer from '../drawer/drawer';

class Book extends Drawer.Component{
    constructor(props) {
        // console.log("constructor");
        super(props);

        this.state = {
            name: 'Hello World'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("Book");
        // console.log(prevProps, prevState);
    }

    componentDidMount() {
        // console.log('componentDidMount');
    }

    render(){
        // console.log("render");
        return(
            <div>
                <h1>{this.state.name}</h1>
                <h2>{this.props.showBook}</h2>
                <button onClick={this.props.toggleBook}>Toggle Book</button>  
            </div>
        )
    }

    componentWillUnmount() {
        // console.log("componentWillUnmount");
    }
}

export default Book;