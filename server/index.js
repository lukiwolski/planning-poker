import express from 'express'
import path from 'path'
import compression from 'compression'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import SocketIo from 'socket.io'
import cookie from 'react-cookie'
import cookieParser from 'cookie-parser'
import routes from '../common/components/routes'

const app = express()

app.use(cookieParser())
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory works
app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      // hey we made it!
      cookie.plugToRequest(req, res);
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

const http = require('http').Server(app)
const io = SocketIo(http)

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('send:message', function(msg) {
    socket.broadcast.emit('send:message', msg);
  })
});

function renderPage(appHtml) {
  return `
  <!doctype html public="storage">
  <html>
    <meta charset=utf-8/>
    <title>Planning Poker</title>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
    `
  }

var PORT = process.env.PORT || 8080
http.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
