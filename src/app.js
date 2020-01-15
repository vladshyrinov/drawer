/* @jsx Drawer.createElement */

import Drawer from './drawer/drawer';
import Book from './components/Book';
import Phone from './components/Phone';


class App extends Drawer.Component{
    constructor(props) {
        super(props);

        this.state = {
            showBook: true
        }

        this.toggleBook = this.toggleBook.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("App");
        console.log(prevProps, prevState);
    }

    toggleBook() {
        this.setState({
            showBook: !this.state.showBook
        });
    }

    render(){
        return(
            <div>
                {true ? <Book showBook={this.state.showBook} toggleBook={this.toggleBook} /> : <div>No book</div>}
                {/* <button onClick={this.toggleBook}>Toggle Book</button>   */}
                {this.state.showBook ? <Phone name={"Xiaomi"} /> : <div>Xiaomi</div>}
            </div>
        )
    }
}

export default App;