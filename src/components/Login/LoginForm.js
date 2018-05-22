import React, { PureComponent } from 'react';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';

import CustomField from '../CustomField';
import Logo from './Logo.svg';
import UserIcon from './user-shape.svg';
import LockIcon from './padlock-unlock.svg';
import {
  LoginContainer,
  LoginWrapper,
  FormContainer,
  FormWrapper,
  SubmitButton,
  Error
} from './Login.styles';

export default class LoginForm extends PureComponent {
  static propTypes = {
    handleValidate: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    // errors: PropTypes.string,
    isFailed: PropTypes.bool
  };

  state = {
    isLogIn: true,
  };

  handleAuthTrigger = ev => {
    ev.preventDefault();
    ev.stopPropagation();

    this.setState(({ isLogIn }) => ({ isLogIn: !isLogIn }));
  };

  handleSubmit = values => {
    const { isLogIn } = this.state
    const { handleSubmit } = this.props

    handleSubmit({...values, isLogIn})
  }

  authorizeMessage = () => {
    const { isLogIn } = this.state;

    if (isLogIn) {
      return (
        <p>
          {`Впервые на сайте? `}
          <a onClick={this.handleAuthTrigger} href="">
            Регистрация
          </a>
        </p>
      );
    } else {
      return (
        <p>
          {`Уже зарегистрированы? `}
          <a onClick={this.handleAuthTrigger} href="">
            Войти
          </a>
        </p>
      );
    }
  };

  render() {
    const { handleValidate, errors, isFailed } = this.props;
    const { isLogIn } = this.state;

    return (
      <LoginContainer>
        <LoginWrapper>
          <img alt="logo" src={Logo} />
          <FormContainer>
            <FormWrapper>
              <Form
                onSubmit={this.handleSubmit}
                validate={handleValidate}
                render={({ handleSubmit, pristine, invalid, ...props }) => (
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="email"
                      component={CustomField}
                      placeholder="email"
                      type="email"
                      iconUrl={UserIcon}
                    />
                    <Field
                      name="password"
                      component={CustomField}
                      placeholder="Password"
                      type="password"
                      iconUrl={LockIcon}
                    />
                    <Error>{ isFailed && errors }</Error>
                    <SubmitButton disabled={pristine || invalid}>
                      {isLogIn ? 'Войти' : 'Регистрация'}
                    </SubmitButton>
                  </form>
                )}
              />
            </FormWrapper>
          </FormContainer>
          <FormContainer>{this.authorizeMessage()}</FormContainer>
        </LoginWrapper>
      </LoginContainer>
    );
  }
}
