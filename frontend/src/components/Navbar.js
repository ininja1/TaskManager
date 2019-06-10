import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className = 'navbar bg-primary'>
          <h1>
            <i className = 'fas fa-list-ul'></i>
            <label className = 'label'>TaskManager</label>
          </h1>
        </nav>
        <h2>Shall we manage some tasks?</h2>
      </div>
    )
  }
}
