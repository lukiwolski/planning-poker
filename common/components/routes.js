import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from './App'
import Login from './dashboard/Dashboard.Login'
import Logout from './dashboard/Dashboard.Logout'
import Dashboard from './dashboard/Dashboard'
import Lobby from './lobby/Lobby.Container'
import auth from '../utils/auth'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

module.exports = (
  <Route path="/" component={App}>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/lobby" component={Lobby} onEnter={requireAuth}/>
    <Route path="/dashboard" component={Dashboard} />
  </Route>
)