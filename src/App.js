import React, { Component } from 'react';
import Todos from './Components/Todos'

//App component: the main homepage where all the boards are located.
class App extends Component {

//render function which gives the page a title, and calls a 'Todo' component for each board in our page.
  render() {
    return (
      <div className="container">
        <header className="App-header">
          <h1 className="app-title">Kanban Board</h1>
        </header>
        <div className="container"><Todos board='To Do'/></div>
        <div className="container"><Todos board='In Progress'/></div>
        <div className="container"><Todos board='Done'/></div>
      </div>
    );
  }
}


export default App;