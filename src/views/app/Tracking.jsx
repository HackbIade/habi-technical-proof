import { dateFormatter } from '../../tools';
import { GiFullPizza } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import { FcCalendar, FcKindle } from 'react-icons/fc';
import trackingService from '../../services/trackingServices';
import CustomLoadingOverlay from '../../components/LoadingOverlay';
import { Button, Container, Modal, ModalBody, ModalHeader } from 'reactstrap';

const Tracking = () => {
  const [limit] = useState(2);
  const [page, setPage] = useState(1);
  const [traking, setTracking] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [itemToggle, setItemToogle] = useState(undefined);

  const getTrackingInfo = async (filters) => {
    const trackingInfo = await trackingService(filters);
    await setTracking(trackingInfo);
    setIsLoading(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleDetail = async (item) => {
    await setItemToogle(item);
    console.log(traking[itemToggle]);
    toggle();
  };

  useEffect(() => {
    setIsLoading(true);
    getTrackingInfo({ limit, page });
  }, [limit, page]);

  return (
    <Container className='my-4'>
      <h5>Seguimiento de ventas</h5>
      <CustomLoadingOverlay active={isLoading}>
        <ul className='list-group list-group mt-2'>
          {traking.length ? (
            traking.map((item, index) => (
              <li
                key={`li-flavors-${index}`}
                className='list-group-item bg-light'
              >
                <div className='d-flex justify-content-between'>
                  <p className='mb-0 text-capitalize'>
                    <GiFullPizza className='mr-1 text-danger' />
                    {item.pizza.name || 'Ingrediente'}
                  </p>
                  <p className='mb-0'>{`$ ${item.price}` || '$ 0.00'}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p className='mb-0 text-capitalize'>
                    <FcCalendar
                      className='mr-1'
                      style={{ cursor: 'pointer' }}
                    />
                    {dateFormatter(item.date) || '--/--/----'}
                  </p>

                  <p className='mb-0 text-capitalize'>
                    <FcKindle
                      className='mr-1'
                      onClick={() => toggleDetail(index)}
                    />
                    Ver detalles
                  </p>
                </div>
              </li>
            ))
          ) : (
            <li key='li-flavors-not' className='list-group-item bg-light'>
              <h6 className='mb-0 d-flex align-items-center text-muted'>
                Sin registro de ventas previas
              </h6>
            </li>
          )}
        </ul>
      </CustomLoadingOverlay>
      {traking.length ? (
        <div className='d-flex justify-content-center mt-2'>
          <Button
            color='dark'
            className='mx-1'
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            Anterior
          </Button>
          <Button color='danger' className='mx-1'>
            {page}
          </Button>
          <Button
            color='dark'
            className='mx-1'
            onClick={() => {
              if (traking.length === limit) {
                setPage(page + 1);
              }
            }}
          >
            Siguiente
          </Button>
        </div>
      ) : null}
      <Modal size='md' isOpen={isOpen} toggle={toggle} centered>
        <ModalHeader toggle={toggle} className='bg-dark text-white'>
          Detalle
        </ModalHeader>
        <ModalBody>
          {typeof itemToggle === 'number' ? (
            <>
              <h5>Cliente</h5>
              <p className='text-capitalize'>
                {traking[itemToggle].client.name}
              </p>
              <h5>Dirrección</h5>
              <p className='text-capitalize'>
                {traking[itemToggle].client.address}
              </p>
              <h5>Extras</h5>
              {traking[itemToggle].extraFlavors.map((extra) => (
                <span className='bg-light m-2'>{extra.name}</span>
              ))}
            </>
          ) : null}
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Tracking;
