import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Header from './components/layout/Header';
import axios from 'axios';
import Footer from './components/layout/Footer';
class App extends Component {
  state= {
    todos: []
  }
  componentDidMount(){
      axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
          .then(res => this.setState({todos: res.data}))
  }
  // Toggle complete
  markComplete=(id)=>{
    this.setState({todos: this.state.todos.map(todo =>{
      if(todo.id=== id){
        todo.completed =!todo.completed
      }
      return todo;
      })});
  }
  //delete Todo
  delTodo= (id)=>{
      axios.delete('http://jsonplaceholder.typicode.com/todos/${id}')
          .then(res =>this.setState({todos: [...this.state.todos.filter
              (todo => todo.id !== id)]}));

  }
  //ADD Todo
  addTodo = (title) =>{
  axios.post('http://jsonplaceholder.typicode.com/todos',{
      title,
      completed: false
  })
      .then(res =>
   this.setState({todos:
    [... this.state.todos, res.data]}));

  }
  render (){
  return (
      <Router>
   <div className="App">
     <div className="conatiner">
   <Header />
   <Route exact path ="/" render={props => (
       <React.Fragment>
         <AddTodo addTodo={this.addTodo}/>
         < Todos todos={this.state.todos}
                 markComplete={this.markComplete}
                 delTodo={this.delTodo}/>
       </React.Fragment>
   )}/>
   <Route path="/about" component={About}/>
   <Footer/>
    </div>
   </div>
      </Router>
  );
  }
}

export default App;