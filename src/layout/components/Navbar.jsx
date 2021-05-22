import React, { useState } from 'react';
import {
  Nav,
  Navbar,
  NavLink,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';

const NavbarLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className='px-2 ' color='light' light expand='md'>
      <NavbarBrand href='/'>Dashboard</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <NavItem>
            <NavLink href='/components/'>Creación</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='https://github.com/reactstrap/reactstrap'>
              Ventas
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='https://github.com/reactstrap/reactstrap'>
              Seguimiento
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarLayout;
