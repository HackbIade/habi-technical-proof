/* eslint-disable react/prop-types */
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

const Unauthorized = (props) => (
  <div className='h-100 d-flex align-items-center bg-light'>
    <Container>
      <h1 className='d-flex justify-content-center display-3'>🕵</h1>
      <p className='d-flex justify-content-center'>
        La página a la cual intentas acceder requiere permisos.
      </p>
      <p className='d-flex justify-content-center'>
        <Button color='danger' onClick={() => props.history.push('/')}>
          Volver al inicio
        </Button>
      </p>
    </Container>
  </div>
);

export default withRouter(Unauthorized);
