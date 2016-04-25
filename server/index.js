import express from 'express';
import http from 'http';
import path from 'path';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import SocketIo from 'socket.io';
import cookie from 'react-cookie';
import cookieParser from 'cookie-parser';
import routes from '../common/components/routes';

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cookieParser());
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')));

function renderPage(appHtml) {
  return `
  <!doctype html public="storage">
  <html>
    <meta charset=utf-8/>
    <title>Planning Poker</title>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
    `;
}

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      // hey we made it!
      cookie.plugToRequest(req, res);
      const appHtml = renderToString(<RouterContext {...props} />);
      res.send(renderPage(appHtml));
    } else {
      res.status(404).send('Not Found');
    }
  });
});

const server = new http.Server(app);
const io = new SocketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send:message', (msg) => {
    socket.broadcast.emit('send:message', msg);
  });
});


server.listen(PORT, () => {
  console.log(`Production Express server running at localhost: + ${PORT}`);
});
