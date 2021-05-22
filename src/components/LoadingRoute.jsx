import React from 'react';
import { Container } from 'reactstrap';
import loading from '../assets/loading.gif';

const LoadingRoute = () => (
  <div className='h-100 d-flex align-items-center'>
    <Container>
      <div className='d-flex justify-content-center'>
        <img src={loading} alt='loading' height='350px' />
      </div>
      <p className='d-flex justify-content-center'>Redireccionando...</p>
    </Container>
  </div>
);

export default LoadingRoute;
