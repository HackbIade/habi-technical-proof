/* eslint-disable react/prop-types */
import React from 'react';
import Login from '../views/auth/Login';
import { Redirect, Route, Switch } from 'react-router-dom';

const AuthRouter = (props) => {
  const { isUserAuthenticated } = props;
  if (isUserAuthenticated) return <Redirect to='/app/home' />;
  return (
    <Switch>
      <Route path='/login' key='/login' component={Login} />
    </Switch>
  );
};

export default AuthRouter;
