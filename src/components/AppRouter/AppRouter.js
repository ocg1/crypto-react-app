import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Login from '../Login';

const appRouter = () => (
  <main>
    <Switch>
      <Route path="/" exact component={Login} />
    </Switch>
  </main>
);

export default withRouter(appRouter);
