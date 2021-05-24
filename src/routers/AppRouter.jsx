import React from 'react';
import Home from '../views/app/Home';
import Sales from '../views/app/Sales';
import Tracking from '../views/app/Tracking';
import AppLayout from '../layouts/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../views/others/NotFound';
import { Switch, withRouter, Route } from 'react-router-dom';

const AppRouter = () => (
  <AppLayout>
    <Switch>
      <ProtectedRoute key='/app/home' path='/app/home' routeComponent={Home} />
      <ProtectedRoute
        key='/app/sales'
        path='/app/sales'
        routeComponent={Sales}
      />
      <ProtectedRoute
        allowedRoles={['admin']}
        key='/app/tracking'
        path='/app/tracking'
        routeComponent={Tracking}
      />
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
  </AppLayout>
);

export default withRouter(AppRouter);
