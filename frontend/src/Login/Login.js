import React, { Component } from 'react'
import Navbar from './components/Navbar'

export default class Authorise extends Component {
  state = {
    login : '',
    password : ''
  }

  onChange = e => this.setState({[e.target.name] : e.target.value});
  
  render() {
    return (
      <div>
        <Navbar />
        <form className='form' style = {{margin: '20px 400px 20px 400px'}}>
          <input name ='login' type= 'text' placeholder = 'Login' value = {this.state.login} onChange = {this.onChange}/>
          <input name = 'password' type= 'password' placeholder = 'Password' value = {this.state.password} onChange = {this.onChange}/>
          <input type = 'submit' value = 'Enter' className = 'btn btn-dark btn-block'/>
          {this.state.login !== '' && this.state.password !== '' && <button className='btn btn-ligth btn-block' onClick = {() => {this.setState({login: '', password: ''})}} >Clear</button>}
          <button onClick = {() => fetch('/record', {method: 'GET'}).then(r => r.json()).then((data) => alert(Object.values(data)))}>Get Data</button>
        </form>
      </div>
    )
  }
}
