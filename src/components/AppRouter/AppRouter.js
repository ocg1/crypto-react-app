import React, { Component } from 'react';
import { Switch, Router, withRouter } from 'react-router-dom';

import Login from '../Login';
import Dashboard from '../Dashboard';
import PrivateRoute from '../PrivateRoute';

class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export default withRouter(AppRouter);
