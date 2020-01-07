/* @jsx Drawer.createElement */

import Drawer from './drawer/drawer';
import Book from './components/Book';


class App extends Drawer.Component{
    constructor(props) {
        super(props);

        this.state = {
            showBook: true
        }

        this.toggleBook = this.toggleBook.bind(this);
    }

    toggleBook() {
        this.setState({
            showBook: !this.state.showBook
        });
    }

    render(){
        return(
            <div>
                {this.state.showBook ? <Book /> : <div>No book</div>}
                <button onClick={this.toggleBook}>Toggle Book</button>  
            </div>
        )
    }
}

export default App;