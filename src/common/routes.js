import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import Lobby from './containers/Lobby';
import Login from './containers/Login';
import Logout from './containers/Logout';
import { requireAuth } from './utils/auth';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/login" />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/lobby" component={Lobby} onEnter={requireAuth} />
    <Route path="*" component={Login} />
  </Route>
);
