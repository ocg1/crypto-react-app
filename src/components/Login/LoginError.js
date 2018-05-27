import React from "react";
import PropTypes from 'prop-types'

import { Error } from './Login.styles';

const loginError = ({ error }) => error ? <Error>{error}</Error> : '';

loginError.propTypes = {
  error: PropTypes.string
}

export default loginError
