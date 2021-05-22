/* eslint-disable react/prop-types */
import useAuth from './hooks/useAuth';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import AppRouter from './routers/AppRouter';
import AuthRouter from './routers/AuthRouter';
import NotFound from './views/others/NotFound';
import { createBrowserHistory } from 'history';
import LoadingRoute from './components/LoadingRoute';
import ProtectedLayout from './layouts/ProtectedLayout';
import { Switch, Route, Redirect } from 'react-router-dom';

const routerHistory = createBrowserHistory();

const App = (props) => {
  const { activeUser } = props;
  const [isUserAuthenticated, loadingAuth] = useAuth();

  if (process.env.REACT_APP_IS_DEV === 'true') {
    window.getActiveUser = () => activeUser;
  }

  return (
    <div style={{ height: '100vh', overflowX: 'hidden' }}>
      <Router history={routerHistory}>
        {loadingAuth ? (
          <LoadingRoute />
        ) : (
          <Switch>
            <Route exact path='/'>
              <Redirect to='/login' />
            </Route>
            <Route
              path='/login'
              render={() => (
                <AuthRouter
                  {...props}
                  isUserAuthenticated={isUserAuthenticated}
                />
              )}
            />
            <ProtectedLayout
              path='/app'
              isUserAuthenticated={isUserAuthenticated}
            >
              <AppRouter />
            </ProtectedLayout>
            <Route path='*' component={NotFound} />
          </Switch>
        )}
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeUser: state.user.activeUser
});

export default connect(mapStateToProps)(App);
