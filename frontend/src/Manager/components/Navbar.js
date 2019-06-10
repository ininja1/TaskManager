import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className='navbar bg-success'>
          <h1>
            <i className='fas fa-th-list'></i>
            <label className='label'> TaskManager</label>
          </h1>
          <a href = "/"><h3>Login</h3></a>
        </nav>
        <h2 align='center'>Shall we manage some tasks?</h2>
      </div>
    )
  }
}
