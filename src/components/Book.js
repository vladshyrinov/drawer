/* @jsx Drawer.createElement */

import Drawer from '../drawer/drawer';

class Book extends Drawer.Component{
    constructor(props) {
        super(props);

        console.log('set state');
        this.state = {
            name: 'Hello World'
        }
    }

    render(){
        return(
            <div>
                {/* <h1>{this.state.name}</h1> */}
            </div>
        )
    }
}

export default Book;