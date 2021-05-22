/* eslint-disable react/prop-types */
import React from 'react';
import logo from '../assets/logo.png';
import NavbarLayout from './components/Navbar';

const AppLayout = ({ children }) => (
  <>
    <img className='mx-3' src={logo} height='60em' alt='logo' />
    <NavbarLayout />
    <div>{children}</div>
  </>
);

export default AppLayout;
