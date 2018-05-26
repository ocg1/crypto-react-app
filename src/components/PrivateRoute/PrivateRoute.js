import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { selectIsAuthorizedFrom } from 'ducks/signIn';

const privateRoute = ({ isAuthorized, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      props =>
        isAuthorized ? (
        <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
    }
  />
);

privateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthorized: selectIsAuthorizedFrom(state),
});

export default connect(mapStateToProps)(privateRoute);
