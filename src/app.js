/* @jsx Drawer.createElement */

import Drawer from './drawer/drawer';
import Book from './components/Book';
import Phone from './components/Phone';


class App extends Drawer.Component{
    constructor(props) {
        super(props);

        this.state = {
            showBook: true,
            names: [],
            currentName: null
        }

        this.toggleBook = this.toggleBook.bind(this);
        this.addPerson = this.addPerson.bind(this);
        this.changeName = this.changeName.bind(this);
        this.removePerson = this.removePerson.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("App");
        // console.log(prevProps, prevState);
    }

    toggleBook() {
        // this.setState({
        //     showBook: !this.state.showBook
        // });
        this.setState((prevState, props) => {
            console.log(props);
            return {
                showBook: !prevState.showBook
            }
        }, () => {
            console.log("New State: ", this.state);
        });
    }

    addPerson() {
        if (this.state.currentName) {
            const id = this.state.names.length === 0 ? 1 : this.state.names[this.state.names.length-1].id + 1;
            this.setState({
                names: [...this.state.names, {value: this.state.currentName, id}],
                currentName: null
            })
        }
    }

    removePerson(e) {
        const personId = e.target.key;
        const names = [...this.state.names];
        const personIdx = this.state.names.findIndex((name) => name.id === personId);
        names.splice(personIdx, 1);
        this.setState({
            names
        });
    } 

    changeName(e) {
        this.setState({
            currentName: e.target.value
        });
    }

    render(){
        return(
            <div>
                {/* {true ? <Book showBook={this.state.showBook} toggleBook={this.toggleBook} /> : <div>No book</div>} */}
                <button onClick={this.toggleBook}>Toggle Book</button>  
                {this.state.showBook ? <Phone name={"Xiaomi"} /> : <div>Xiaomi</div>}
                {/* <ul>
                    {
                        this.state.names.map((name) => {
                        return <li key={name.id} onClick={this.removePerson}>{name.value}</li>;
                        })
                    }
                </ul>
                <input type="text" placeholder="Add a new name" value={this.state.currentName} onChange={this.changeName} />
                <button onClick={this.addPerson}>Submit</button> */}
            </div>
        )
    }
}

export default App;