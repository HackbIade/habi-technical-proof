import React from 'react';
import Home from '../views/app/Home';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../views/others/NotFound';
import { Switch, withRouter, Route } from 'react-router-dom';

const AppRouter = () => (
  <AppLayout>
    <Switch>
      <ProtectedRoute key='/app/home' path='/app/home' routeComponent={Home} />
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  </AppLayout>
);

export default withRouter(AppRouter);
