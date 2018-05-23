import React, { PureComponent, Fragment } from 'react';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import particlesParams from 'particles-params';
import LoginForm from './LoginForm';
import * as validates from 'lib/validators';
import { newUser, selectSignUpErrorFrom, selectSignUpIsFailedFrom } from 'ducks/signUp';
import { selectSignInErrorFrom, selectSignInIsFailedFrom, newSession, selectIsAuthorizedFrom } from 'ducks/signIn';

const PASSWORD_REGEXP = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/g;
const EMAIL_REGEXP = /.+@.+\..+/i;

export class Login extends PureComponent {
  handleValidate = ({ password = '', email = '' }) => {
    const passwordErrors = validates.compose(
      validates.initialize({ errors: {} }),
      validates.length({ min: 6 }),
      validates.format({ format: PASSWORD_REGEXP }),
      validates.fieldExtract('errors'),
    )({ password });

    const emailErros = validates.compose(
      validates.initialize({ errors: {} }),
      validates.format({ format: EMAIL_REGEXP }),
      validates.fieldExtract('errors'),
    )({ email });

    return validates.consolidate(passwordErrors, emailErros);
  };

  handleSubmit = ({ email, password, isLogIn }) => {
    const { newSession, newUser } = this.props;

    isLogIn ? newSession({ email, password }) : newUser({ email, password });
  };

  render() {
    const { errors, isFailed, isAuthorized } = this.props;
    if (isAuthorized) return <Redirect to='/exchange/btc' />

    return (
      <Fragment>
        <LoginForm
          {...{
            handleSubmit: this.handleSubmit,
            handleValidate: this.handleValidate,
            errors,
            isFailed,
          }}
        />
        <Particles params={particlesParams} height="100vh" />
      </Fragment>
    );
  }
}

const mapDispatchToProps = { newSession, newUser };
const mapStateToProps = state => ({
  errors: selectSignInErrorFrom(state) || selectSignUpErrorFrom(state),
  isFailed: selectSignInIsFailedFrom(state) || selectSignUpIsFailedFrom(state),
  isAuthorized: selectIsAuthorizedFrom(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
