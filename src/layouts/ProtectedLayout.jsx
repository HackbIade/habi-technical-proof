/* eslint-disable react/prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';

const ProtectedLayout = (props) => {
  const { children, isUserAuthenticated } = props;
  return isUserAuthenticated ? children : <Redirect to='/login' />;
};

export default ProtectedLayout;
