/* eslint-disable guard-for-in */
import React, { useEffect, useState } from 'react';
import { GiFullPizza } from 'react-icons/gi';
import unSelectPizza from '../../assets/unSelectPizza.png';
import {
  Col,
  Row,
  Card,
  Button,
  CardBody,
  Container,
  CardHeader
} from 'reactstrap';
import getPizzasService from '../../services/pizzasServices';
import getIngredientsService from '../../services/ingredientsServices';

const Sales = () => {
  const [price, setPrice] = useState(0);
  const [pizza] = useState(undefined);
  const [extras, setExtras] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [extraFlavors, setExtraFlavors] = useState([]);

  const getPizzas = async () => {
    const pizzasList = await getPizzasService();
    setPizzas(pizzasList);
  };

  const getExtras = async () => {
    let extrasList = await getIngredientsService();
    extrasList = extrasList.filter((item) => item.notExtra !== true);
    setExtras(extrasList);
  };

  const getPrice = () => {
    let totalPrice = 0;
    // totalPrice += pizza.cost;
    extraFlavors.forEach((extra) => {
      totalPrice += extra.cost;
    });
    setPrice(totalPrice);
  };

  useEffect(() => {
    getPizzas();
    getExtras();
  }, []);

  useEffect(() => {
    getPrice();
  });

  const setNewExtraFlavor = (extra) => {
    if (extraFlavors.filter((item) => item.name === extra.name).length) {
      setExtraFlavors(extraFlavors.filter((item) => item.name !== extra.name));
    } else {
      setExtraFlavors([...extraFlavors, extra]);
    }
  };

  return (
    <Container className='mt-4'>
      <Row>
        <Col xs='12' md='5'>
          <Card>
            <CardHeader className='bg-dark text-white'>
              <h4 className='m-0'>Resumen</h4>
            </CardHeader>
            <CardBody>
              <div className='d-flex justify-content-between'>
                <h5>Pizza</h5>
                <p>{`$ ${price} COP`}</p>
              </div>
              {pizza ? (
                <img className='card-img-top' src={pizza?.photo} alt='pizza' />
              ) : (
                <img
                  className='card-img-top'
                  width='273px'
                  src={unSelectPizza}
                  alt='unSelect pizza'
                />
              )}
              <h5>Extras</h5>
              <ul className='list-group list-group mt-2'>
                {extraFlavors.length ? (
                  extraFlavors.map((item) => (
                    <li
                      key={`li-flavors-${item.name}`}
                      className='list-group-item bg-light'
                    >
                      <div className='d-flex justify-content-between'>
                        <p className='mb-0 text-capitalize'>
                          <GiFullPizza className='mr-1 text-danger' />
                          {item.name || 'Ingrediente'}
                        </p>
                        <p className='mb-0'>{`$ ${item.cost}` || '$ 0.00'}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li key='li-flavors-not' className='list-group-item bg-light'>
                    <h6 className='mb-0 d-flex align-items-center text-muted'>
                      Sin extras
                    </h6>
                  </li>
                )}
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col xs='12' md='7'>
          <Card>
            <CardHeader className='bg-dark text-white'>
              <h4 className='m-0'>Proceso de venta</h4>
            </CardHeader>
            <CardBody>
              <h5>Selecciona Pizza</h5>
              {pizzas.length ? (
                <Row className='d-flex justify-content-around'>
                  {pizzas.map((pizzaItem) => (
                    <Col xs='6' md='4' key={pizzaItem.name}>
                      <Card className='mb-2'>
                        <CardHeader>
                          <p className='text-center text-capitalize m-0 text-truncate'>
                            {pizzaItem.name}
                          </p>
                        </CardHeader>
                        <CardBody>
                          <img
                            className='card-img-top'
                            src={pizzaItem.photo}
                            alt={pizzaItem.name}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className='text-muted'>No hay pizzas base aún creadas</p>
              )}
              <h5 className='mt-2'>Selecciona Extras</h5>
              {extras.length ? (
                <Row>
                  {extras.map((extraItem) => (
                    <Col xs='6' md='auto' key={extraItem.name}>
                      <Button
                        color={
                          extraFlavors.filter(
                            (item) => item.name === extraItem.name
                          ).length
                            ? 'danger'
                            : 'dark'
                        }
                        className='mb-2'
                        onClick={() => setNewExtraFlavor(extraItem)}
                      >
                        <p className='text-center text-capitalize m-0 text-truncate'>
                          {extraItem.name}
                        </p>
                      </Button>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className='text-muted'>No hay pizzas base aún creadas</p>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Sales;
