import React, { Component } from 'react';

//task component, which is used to instantiate each task.
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.task.title,
            description: this.props.task.description,
            user: this.props.task.user,
            points: this.props.task.points,
            board: this.props.task.board,
            currentDate: Date().toLocaleString(),
        }
        console.log(this.state.board);
        this.deleteTask = this.deleteTask.bind(this);
    }

    deleteTask() {
      console.log('deleting', this.state.title);
      fetch('/api/deleteTask/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            board: this.state.board, 
            title: this.state.title}),
      })
        .then((res) => {
          window.location.reload(); 
          window.location = window.location.href;
          console.log(res);
        })
        .catch((err) => console.log(err));
    }


//render function for each task, which shows each task on its board.
  render() {
    return (
      
      <div className='task'>
       <b>{this.props.task.title}</b> <button onClick={this.deleteTask}>Delete</button>
       <p>Description: {this.props.task.description}</p>
       <p>User: {this.props.task.user}</p>
       <p>Points: {this.props.task.points}</p>
       <p>Date added: { this.state.currentDate }</p>
      </div>
    );
  }
}

export default Task;