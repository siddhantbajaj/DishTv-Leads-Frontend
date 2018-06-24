import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => {
  console.log(Component);
  return <Route {...rest} render={props => (localStorage.getItem('token') !== null ? <Component {...props} /> : <Redirect to="/login" />)} />;
};
