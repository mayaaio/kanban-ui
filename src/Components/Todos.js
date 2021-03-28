import React, { Component } from 'react';
import Task from './Task'
import AddTask from './AddTask'

//Todos component (probably better named board), which represents a given board.
class Todos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            board: this.props.board,
        }
    }

    //componentDidMount gets the data from the JSon file, sets it to a 'Task', and sets the state.
    componentDidMount() {
      var boardType = 'todos';
    
      if (this.state.board === 'Done') {
        boardType = 'done';
      }
      if (this.state.board === 'In Progress') {
        boardType = 'inprogress';
      }
      console.log(this.state.board);

      fetch('/api/list' + boardType, {
        method: 'GET',
      })
        .then((res) => res.json()) 
        .then((taskList) => { 
          let taskDivs = taskList.map(function (taskItem) {
            console.log(taskItem);
              return <Task key={taskItem.title} task={taskItem}/>;
          });
          this.setState({
            todos: taskDivs,
          });
        })
        .catch((err) => console.log(err)); 
    }


//Renders the board with its name, a list of tasks which is kept in the state, and a 'add task' button.
  render() {
    return (
      <div >
        <h2>{this.props.board}</h2>
        <ul>
            {this.state.todos}
        </ul>
        <div>
            <AddTask board={this.state.board}></AddTask>
              </div>
      </div>
    );
  }
}

export default Todos;