import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import App from './App'
import Home from './containers/Home'
import Lobby from './containers/Lobby'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="lobby/:name" component={Lobby} />
  </Route>
)
