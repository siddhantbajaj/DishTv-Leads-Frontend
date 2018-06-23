import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route component={MainLayout} path="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
