/* eslint-disable react/prop-types */
import React from 'react';
import i404 from '../../assets/404.png';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

const NotFound = (props) => (
  <div className='h-100 d-flex align-items-center bg-light'>
    <Container>
      <div className='d-flex justify-content-center'>
        <img src={i404} alt='Logo' height='300 px' />
      </div>
      <h1 className='d-flex justify-content-center display-3'>
        Página no encontrada
      </h1>
      <p className='d-flex justify-content-center'>
        La página a la cual intentas acceder no fue encontrada.
      </p>
      <p className='d-flex justify-content-center'>
        <Button color='primary' onClick={() => props.history.push('/')}>
          Volver al inicio
        </Button>
      </p>
    </Container>
  </div>
);

export default withRouter(NotFound);
