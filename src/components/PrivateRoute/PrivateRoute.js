import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { selectIsAuthorizedFrom } from "ducks/signIn";
import Header from '../Header'
import Footer from '../Footer'

const privateRoute = ({ isAuthorized, path, ...props }) => {
  const Component = props.component

  if (!isAuthorized) return <Redirect to="/" />;

  return <Route path={path} render={() => (
    <Fragment>
      <Header />
      <Component {...props.computedMatch.params} />
      <Footer />
    </Fragment>
  )} />;
}

privateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthorized: selectIsAuthorizedFrom(state),
});

export default connect(mapStateToProps)(privateRoute);
