import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from './Login/Login.js'
import Register from './Register/Register.js'
import Manager from './Manager/Manager.js'

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path = '/' component={Login}/>
        <Route exact path = '/sign' component = {Register}/>
        <Route exact path = '/manager' component={Manager} />
      </Switch>
      </Router >
    </div>
  );
}

export default App;
