import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Login from '../Login';
import PrivateRoute from "../PrivateRoute";
import Exchange from '../Exchange';

const appRouter = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <PrivateRoute path="/exchange/:currency" component={Exchange} />
  </Switch>
);

export default withRouter(appRouter);
