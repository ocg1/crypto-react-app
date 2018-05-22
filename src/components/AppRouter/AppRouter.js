import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Login from '../Login';
import PrivateRoute from "../PrivateRoute";
import Exchange from "../Exchange";

const appRouter = () => (
  <main>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path='/exchange' component={Exchange} />
    </Switch>
  </main>
);

export default withRouter(appRouter);
