import React from 'react';
import Home from './views/Home';
import { Router } from 'react-router';
import AppLayout from './layout/AppLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';
import { Switch, Route, Redirect } from 'react-router-dom';

const routerHistory = createBrowserHistory();

const App = () => (
  <AppLayout>
    <Router history={routerHistory}>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route key='/home' path='/home' component={Home} />
      </Switch>
    </Router>
  </AppLayout>
);

export default App;
