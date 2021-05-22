import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Unauthorized from '../views/others/Unauthorized';

const ProtectedRoute = (componentProps) => {
  const userHaveAccess = () => {
    if (componentProps.allowedRoles) {
      if (componentProps.activeUser?.rol) {
        const userRol = componentProps.activeUser.rol;
        const requiredRoles = componentProps.allowedRoles;

        return requiredRoles.some((target) => target === userRol);
      }
    }

    return componentProps.isUserAuthenticated;
  };

  return (
    <Route
      exact
      {...componentProps}
      render={(props) =>
        userHaveAccess(componentProps) ? (
          <componentProps.routeComponent {...props} />
        ) : (
          <Unauthorized />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.isUserAuthenticated,
  activeUser: state.user.activeUser
});

export default connect(mapStateToProps)(ProtectedRoute);
