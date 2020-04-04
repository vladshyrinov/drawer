/* @jsx Drawer.createElement */

import Drawer from '../../lib/drawer';

// Class component example

class Book extends Drawer.Component{
    constructor(props) {
        super(props);

        this.state = {
            name: 'Harry Potter Book'
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Book componentDidUpdate");
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
    }

    componentDidMount() {
        console.log('Book componentDidMount');
    }

    render(){
        return(
            <div>
                {this.props.showBook ? <p>{this.state.name}</p> : <p>No book to show</p>}
                <button onClick={this.props.toggleBook}>Toggle Book</button>  
            </div>
        )
    }

    componentWillUnmount() {
        console.log("Book componentWillUnmount");
    }
}

export default Book;