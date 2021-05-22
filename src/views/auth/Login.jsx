import {
  Row,
  Card,
  Form,
  Label,
  Input,
  Alert,
  Button,
  Spinner,
  CardBody,
  FormGroup,
  CardHeader
} from 'reactstrap';
import { connect } from 'react-redux';
import { SingIn } from '../../firebase';
import React, { Component } from 'react';
import { FaUnlock } from 'react-icons/fa';
import { userLogin } from '../../store/user';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: '',
      spinner: false,
      formInvalid: false,
      warningMessage: ''
    };
  }

  handleSubmit = (e) => {
    const { user, password } = this.state;
    e.preventDefault();
    this.setSpinner(true);
    if (user === '' || password === '') {
      this.triggerWarning('Campos incompletos');
      this.setSpinner(false);
    } else {
      this.login();
    }
  };

  setSpinner = (value) => {
    this.setState({ spinner: value });
  };

  triggerWarning = (message) => {
    this.setState({
      formInvalid: true,
      warningMessage: message
    });
    setTimeout(() => {
      this.setState({
        formInvalid: false,
        warningMessage: ''
      });
    }, 3000);
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  login = async () => {
    try {
      SingIn(this.state);
    } catch (error) {
      let message;
      switch (error.code) {
        case 'auth/wrong-password':
          message = 'La contraseña no es valida';
          break;
        case 'auth/user-not-found':
          message = 'El usuario no está registrado';
          break;
        case 'auth/argument-error':
          message = 'El email no tiene un formato valido';
          break;
        default:
          message = 'Ha ocurrido un error inesperado, intente mas tarde';
          break;
      }
      this.triggerWarning(message);
    }
  };

  render() {
    const { formInvalid, warningMessage, password, user, spinner } = this.state;
    return (
      <Row className='h-100 d-flex justify-content-center align-items-center'>
        <Card className='card w-50 h-30'>
          <CardHeader className='bg-dark text-white'>
            <h5 className='m-0'>
              <FaUnlock className='mr-2' />
              Iniciar Sesión
            </h5>
          </CardHeader>
          <CardBody>
            {formInvalid ? (
              <Alert color='warning'>{warningMessage}</Alert>
            ) : null}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for='user'>Correo electrónico</Label>
                <Input
                  name='user'
                  placeholder='ejemplo@email.com'
                  value={user}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='password'>Contraseña</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Contraseña'
                  value={password}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <br />
              <Button type='submit' color='success' block disabled={spinner}>
                {spinner ? <Spinner /> : 'Iniciar Sesión'}
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  isUserAuthenticated: state.user.isUserAuthenticated,
  activeUser: state.user.activeUser
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (logUser) => {
    dispatch(userLogin(logUser));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
