/* eslint-disable react/prop-types */
import React from 'react';
import NavbarLayout from './components/Navbar';

const AppLayout = ({ children }) => (
  <>
    <NavbarLayout />
    <div>{children}</div>
  </>
);

export default AppLayout;
