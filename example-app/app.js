/* @jsx Drawer.createElement */

import Drawer from '../lib/drawer';
import Book from './components/Book';
import Phone from './components/Phone';
import './scss/style.scss';


class App extends Drawer.Component {
    constructor(props) {
        super(props);

        this.state = {
            showBook: true,
            showPhone: true
        }

        this.toggleBook = this.toggleBook.bind(this);
        this.togglePhone = this.togglePhone.bind(this);
    }

    componentDidMount() {
        console.log('App componentDidMount');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("App componentDidUpdate");
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
    }

    toggleBook() {
        // Set state with a callback function
        this.setState((prevState, props) => {
            return {
                showBook: !prevState.showBook
            }
        }, () => {
            console.log("New State: ", this.state);
        });
    }

    togglePhone() {
        // Set state as an object
        this.setState({
            showPhone: !this.state.showPhone
        });
    }

    render() {
        return (
            <div>
                <h1>Examples</h1>
                <h2>Render of class component component</h2>
                <Book showBook={this.state.showBook} toggleBook={this.toggleBook} />
                <hr />
                <h2>Render of functional component</h2>
                {this.state.showPhone ? <Phone name={"Xiaomi"} /> : <p>No phone to show</p>}
                <button onClick={this.togglePhone}>Toggle Phone</button>
            </div>
        )
    }

    componentWillUnmount() {
        console.log("App componentWillUnmount");
    }
}

export default App;