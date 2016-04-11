/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _compression = __webpack_require__(3);

	var _compression2 = _interopRequireDefault(_compression);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(5);

	var _reactRouter = __webpack_require__(6);

	var _socket = __webpack_require__(7);

	var _socket2 = _interopRequireDefault(_socket);

	var _routes = __webpack_require__(8);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.use((0, _compression2.default)());

	// serve our static stuff like index.css
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

	// send all requests to index.html so browserHistory works
	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      // hey we made it!
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	var http = __webpack_require__(14).Server(app);
	var io = (0, _socket2.default)(http);

	io.on('connection', function (socket) {
	  console.log('a user connected');

	  socket.on('send:message', function (msg) {
	    socket.broadcast.emit('send:message', msg);
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Planning Poker</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	http.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _App = __webpack_require__(9);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(_reactRouter.Route, { path: '/', component: _App2.default });

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _socket = __webpack_require__(10);

	var _socket2 = _interopRequireDefault(_socket);

	var _MessageForm = __webpack_require__(11);

	var _MessageForm2 = _interopRequireDefault(_MessageForm);

	var _MessageList = __webpack_require__(12);

	var _MessageList2 = _interopRequireDefault(_MessageList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('');

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      messages: ['some some', 'some mo']
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    socket.on('send:message', this.messageRecieve);
	  },
	  messageRecieve: function messageRecieve(message) {
	    var messages = this.state.messages;

	    messages.push(message);
	    this.setState({ messages: messages });
	  },
	  handleMessageSubmit: function handleMessageSubmit(message) {
	    var messages = this.state.messages;

	    messages.push(message);
	    this.setState({ messages: messages });
	    socket.emit('send:message', message);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_MessageForm2.default, { onMessageSubmit: this.handleMessageSubmit }),
	      _react2.default.createElement(_MessageList2.default, { messages: this.state.messages })
	    );
	  }
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'MessageForm',
	  getInitialState: function getInitialState() {
	    return {
	      text: ''
	    };
	  },
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();

	    var message = this.state.text;

	    this.props.onMessageSubmit(message);
	    this.setState({ text: '' });
	  },
	  changeHandler: function changeHandler(e) {
	    this.setState({ text: e.target.value });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'form',
	      { onSubmit: this.handleSubmit },
	      _react2.default.createElement('input', {
	        onChange: this.changeHandler,
	        value: this.state.text
	      })
	    );
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Message = __webpack_require__(13);

	var _Message2 = _interopRequireDefault(_Message);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	    displayName: 'MessageList',
	    render: function render() {
	        return _react2.default.createElement(
	            'div',
	            { className: 'messages' },
	            _react2.default.createElement(
	                'h2',
	                null,
	                ' Conversation: '
	            ),
	            this.props.messages.map(function (message, i) {
	                return _react2.default.createElement(_Message2.default, {
	                    key: i,
	                    text: message
	                });
	            })
	        );
	    }
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (props) {
	    return _react2.default.createElement(
	        "div",
	        { className: "message" },
	        _react2.default.createElement(
	            "span",
	            null,
	            props.text
	        )
	    );
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ }
/******/ ]);