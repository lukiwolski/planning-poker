// express imports
import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
// react imports
import React from 'react';
import { renderToString } from 'react-dom/server';
// react-router and redux
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
// socket and cookie
import SocketIo from 'socket.io';
import cookie from 'react-cookie';
import cookieParser from 'cookie-parser';
// project components
import { configureStore } from '../common/store';
import routes from '../common/routes';

const PORT = process.env.PORT || 8080;
const app = express();

// Using cookieParser middleware in order to be able to use cookie.plugToRequest
app.use(cookieParser());
app.use(compression());

// Express serves the files from public directory
app.use(express.static(path.join(__dirname, 'public')));

import serialize from 'serialize-javascript';
// renderPage is called with the initial response from Express with the dom structure
function renderPage(appHtml, initialState) {
  return `
  <!doctype html public="storage">
  <html>
    <meta charset=utf-8/>
    <title>Planning Poker</title>
    <div id=app>${appHtml}</div>
    <script> 
      window.__INITIAL_STATE__ = ${serialize(initialState)}
    </script>
    <script src="/bundle.js"></script>
    `;
}

// This is fired every time the server side receives a request
app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.path);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);
  const initialState = store.getState();

  match({ routes, history, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      cookie.plugToRequest(req, res);

      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...props} />
        </Provider>
      );

      res.status(200).send(renderPage(html, initialState));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

// initiating SocketIo
const server = new http.Server(app);
const io = new SocketIo(server);

// setting up socket actions
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send:message', (msg) => {
    socket.broadcast.emit('send:message', msg);
  });
});

// starting the server
server.listen(PORT, () => {
  console.log(`Production Express server running at localhost: + ${PORT}`);
});
