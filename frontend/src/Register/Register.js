import React, { Component } from 'react'
import Navbar from '../Manager/components/Navbar'

export default class Register extends Component {
  state = {
    login: '',
    password: '',
    confirmpassword: '',
    email: ''
  }

  onChange = e => this.setState({[e.target.name]: e.target.value});
  onSubmit = (data) => console.log(data);

  render() {
    const {login, password, confirmpassword, email} = this.state;
    return (
      <div>
        <Navbar />
        <form className = 'form' style={{margin: '20px 400px 20px 400px'}} >
        <input name = 'login' type='text' placeholder='Login' value = {login} onChange = {this.onChange}/>
        <input name = 'password' type='password' placeholder='Password' value = {password} onChange = {this.onChange}/>
        <input name = 'confirmpassword' type='password' placeholder='Confirm the password' value = {confirmpassword} onChange = {this.onChange}/>
        <input name = 'email' type='text' placeholder='Email' value = {email} onChange = {this.onChange}/>
        <input type='submit' value='Enter' className='btn btn-dark btn-block' onSubmit = {this.onSubmit}/>
        </form>
      </div>
    )
  }
}
