import React, { Component } from 'react';

//AddTask component, which is called by every 'Todo' board, and allows a user to add a task to that board.
class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTitle: '',
            newDesc: '',
            newUser: '',
            newPoints: 0,
            board: this.props.board,
        }

        this.changeTitle = this.changeTitle.bind(this);
        this.changeDesc = this.changeDesc.bind(this);
        this.changePoints = this.changePoints.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.addTodoSubmit = this.addTodoSubmit.bind(this);
    }

//Function which is called upon a button press and sends text box data to the backend for the task to be added.
  addTodoSubmit() {
    if (this.state.newTitle === '') return;
    if (this.state.newDesc === '') return;
    console.log('new title', this.state.newTitle);    
    fetch('/api/addToDo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
          title: this.state.newTitle, 
          description: this.state.newDesc, 
          user: this.state.newUser,
          board: this.state.board,
          points: this.state.newPoints}),
    })
      .then((res) => {
        this.setState({ newTitle: '' }); 
        this.setState({ newDesc: '' }); 
        this.setState({ newUser: '' }); 
        this.setState({ newPoints: 0 }); 
        window.location.reload(); 
        window.location = window.location.href;
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  //Functions which change the state of the task title, description, user, etc. upon user changes.
  changeTitle(e) {
    this.setState({ newTitle: e.target.value });
  }

  changeDesc(e) {
      this.setState({ newDesc: e.target.value})
  }

  changeUser(e) {
    this.setState({ newUser: e.target.value})
}

  changePoints(e) {
    this.setState({ newPoints: e.target.value})
}

//render function for each 'add task' button, which allows the user to enter data and add a task.
  render() {
    return (
      <form className='add-form'>
          <div className='form-control'>
              <label>Task</label>
              <input
                type='text'
                id='addtitle'
                name='addtitle'
                value={this.state.newTitle}
                onChange={this.changeTitle}
              />
              <div>
              <label htmlFor='adddesc'>Description:</label>
              <input
                type='text'
                id='adddesc'
                name='adddesc'
                value={this.state.newDesc}
                onChange={this.changeDesc}
              />
              </div>
              <label>User:</label>
              <input
                type='text'
                id='adduser'
                name='adduser'
                value={this.state.newUser}
                onChange={this.changeUser}
              />
              <div></div>
              <div>
              <label htmlFor='addpoints'>Points:</label>
              <input
                type='number'
                id='addpoints'
                name='addpoints'
                value={this.state.newPoints}
                onChange={this.changePoints}
              />
              </div>
              <button type='button' className='btn' onClick={this.addTodoSubmit}>
                Add
              </button>
          </div>
      </form>
    );
  }
}

export default AddTask;