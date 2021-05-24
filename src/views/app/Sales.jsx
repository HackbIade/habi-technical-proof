/* eslint-disable react/prop-types */
/* eslint-disable guard-for-in */
import {
  Col,
  Row,
  Card,
  Form,
  Input,
  Button,
  Spinner,
  CardBody,
  CardHeader,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from 'reactstrap';
import { connect } from 'react-redux';
import { GiFullPizza } from 'react-icons/gi';
import React, { useEffect, useState } from 'react';
import setSaleService from '../../services/salesServices';
import unSelectPizza from '../../assets/unSelectPizza.png';
import getPizzasService from '../../services/pizzasServices';
import getIngredientsService from '../../services/ingredientsServices';

const Sales = (props) => {
  const [price, setPrice] = useState(0);
  const [extras, setExtras] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState(undefined);
  const [extraFlavors, setExtraFlavors] = useState([]);
  const [saleLoading, setSaleLoading] = useState(false);
  const [client, setClient] = useState({ name: '', address: '' });

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
    totalPrice += pizza?.cost ? pizza.cost : 0;
    extraFlavors.forEach((extra) => {
      totalPrice += extra.cost;
    });

    totalPrice *= 1 + props.activeUser.profitability;
    setPrice(totalPrice);
  };

  const setNewExtraFlavor = (extra) => {
    if (extraFlavors.filter((item) => item.name === extra.name).length) {
      setExtraFlavors(extraFlavors.filter((item) => item.name !== extra.name));
    } else {
      setExtraFlavors([...extraFlavors, extra]);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setClient({ ...client, [name]: value });
  };

  useEffect(() => {
    getPizzas();
    getExtras();
  }, []);

  useEffect(() => {
    getPrice();
  }, [extraFlavors, pizza]);

  return (
    <div className='m-4'>
      <Row>
        <Col xs='12' md='4'>
          <Card>
            <CardHeader className='bg-dark text-white d-flex justify-content-between'>
              <h4 className='m-0'>Resumen</h4>
              <Button
                size='sm'
                color='success'
                disabled={
                  !(pizza && client?.name && client?.address) || saleLoading
                }
                onClick={() => {
                  setSaleLoading(true);
                  setSaleService({ client, pizza, extraFlavors, price });
                  setExtraFlavors([]);
                  setPizza(undefined);
                  setClient({ name: '', address: '' });
                  setSaleLoading(false);
                }}
              >
                {saleLoading ? <Spinner size='sm' /> : 'Vender'}
              </Button>
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
        <Col xs='12' md='8'>
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
                      <Card
                        className='mb-2'
                        onClick={() => setPizza(pizzaItem)}
                      >
                        <CardHeader
                          className={
                            pizza?.name === pizzaItem.name
                              ? 'bg-success text-white'
                              : 'bg-dark text-white'
                          }
                        >
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
                            ? 'success'
                            : 'dark'
                        }
                        className='mb-2'
                        onClick={async () => setNewExtraFlavor(extraItem)}
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

              <h5 className='mt-2'>Cliente</h5>
              <Form>
                <Row>
                  <Col>
                    <InputGroup className='mt-2'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText className='input-group-prepend'>
                          Nombre
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name='name'
                        type='text'
                        value={client?.name}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className='mt-2'>
                      <InputGroupAddon addonType='prepend'>
                        <InputGroupText className='input-group-prepend'>
                          Dirección
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name='address'
                        type='text'
                        value={client?.address}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  activeUser: state.user.activeUser
});

export default connect(mapStateToProps)(Sales);
