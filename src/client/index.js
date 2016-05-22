import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import { configureStore } from '../common/store';
import routes from '../common/routes';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__ || undefined;

const store = configureStore(browserHistory, initialState);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// This is the entry point for the client side version of React
// where the top level component is mounted and provided with redux store
render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
  document.getElementById('app')
);
