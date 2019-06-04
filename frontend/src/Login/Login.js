import React, { Component } from 'react'
import './Login.css'

export default class Login extends Component {
  render() {
    return (
      <div>
        <h1>Demo Login page</h1>
        <div className = 'Deck'>
          <h4>Login</h4>
          <input type = 'text' />
          <h4>Password</h4>
          <input type = 'password' />
          <br /><br />
          <button>Enter</button>
        </div>
      </div>
    )
  }
}
