import React, { PureComponent, Fragment } from 'react';
import Particles from 'react-particles-js';

import particlesParams from 'particles-params';
import LoginForm from './LoginForm';
import * as validates from 'lib/validators';

const PASSWORD_REGEXP = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/g;
const EMAIL_REGEXP = /.+@.+\..+/i;

class Login extends PureComponent {
  handleValidate = ({ password = '', email = '' }) => {
    const passwordErrors = validates.compose(
      validates.initialize({ errors: {} }),
      validates.length({ min: 6 }),
      validates.format({ format: PASSWORD_REGEXP }),
      validates.fieldExtract('errors'),
    )({ password });

    const emailErros = validates.compose(
      validates.initialize({ errors: {} }),
      validates.length({ min: 5 }),
      validates.format({ format: EMAIL_REGEXP }),
      validates.fieldExtract('errors'),
    )({ email });

    return validates.consolidate(passwordErrors, emailErros);
  };

  handleSubmit = ({ email, password }) => {};

  render() {
    return (
      <Fragment>
        <LoginForm
          {...{
            handleSubmit: this.handleSubmit,
            handleValidate: this.handleValidate,
          }}
        />
        <Particles params={particlesParams} height="100vh" />
      </Fragment>
    );
  }
}

export default Login;
