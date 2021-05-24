/* eslint-disable react/prop-types */
import {
  Nav,
  Navbar,
  NavItem,
  Collapse,
  NavbarBrand,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { SingOut } from '../../firebase';
import { withRouter } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { userLogout } from '../../store/user';

const NavbarLayout = (props) => {
  const { activeUser } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const logout = () => {
    SingOut()
      .then(() => {
        userLogout();
      })
      .catch((e) => console.log(e));
  };
  return (
    <Navbar className='px-2 text-white' color='danger' light expand='md'>
      <NavbarBrand className='text-white' href='/'>
        Dashboard
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className='mr-auto' navbar>
          <NavItem
            className='mr-2'
            style={{ cursor: 'pointer' }}
            onClick={() => props.history.push('/app/cretion')}
          >
            Creación
          </NavItem>
          <NavItem
            className='mr-2'
            style={{ cursor: 'pointer' }}
            onClick={() => props.history.push('/app/sales')}
          >
            Ventas
          </NavItem>
          <NavItem
            className='mr-2'
            style={{ cursor: 'pointer' }}
            onClick={() => props.history.push('/app/tracking')}
          >
            Seguimiento
          </NavItem>
          <NavItem
            className='mr-2'
            style={{ cursor: 'pointer' }}
            onClick={() => props.history.push('/app/settings')}
          >
            Ajustes
          </NavItem>
        </Nav>
        <Nav navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle className='text-white' nav caret>
              {`${activeUser.name} (${activeUser.rol})`}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavItem onClick={() => logout()}>
                  <FaSignOutAlt /> Cerrar Sesión
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
const mapStateToProps = (state) => ({
  activeUser: state.user.activeUser
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => {
    dispatch(userLogout());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarLayout));
