import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Home from './components/Home';
import Create from './components/Create';
import Edit from './components/Edit';
import Notfound from './components/Notfound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Spot Quiz</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/edit'} className="nav-link">Edit</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Welcome to the Spot Quiz</h2> <br/>
          <Switch>
              <Route exact path='/' component={ Home } />
              <Route path='/create' component={ Create } />
              <Route path='/edit' component={ Edit } />
              <Route component={ Notfound } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
