import React, { Component } from 'react'
import Navbar from './components/Navbar.js'
import Menu from './components/Menu.js'
import Tasks from './components/Tasks.js'

export default class Manager extends Component {

  state = {
    tasks: ['Create own Metarhia', 'Fight the world']
  }

  render() {
    return (
      <div >
        <Navbar />
        <Menu />
        <Tasks tasks = {this.state.tasks}/>
      </div>
    )
  }
}
