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

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

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

	var _routes = __webpack_require__(7);

	var _routes2 = _interopRequireDefault(_routes);

	var _socket = __webpack_require__(13);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PORT = process.env.PORT || 8080;
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

	var server = app.listen(PORT, 'localhost', function (err) {
	  if (err) {
	    console.log(err);
	    return;
	  }
	  console.log('server listening on port: %s', PORT);
	});

	var io = new _socket2.default(server);
	var socketEvents = __webpack_require__(14)(io);

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Planning Poker</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _App = __webpack_require__(8);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(10);

	var _Home2 = _interopRequireDefault(_Home);

	var _Lobby = __webpack_require__(12);

	var _Lobby2 = _interopRequireDefault(_Lobby);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: 'lobby/:name', component: _Lobby2.default })
	);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _socket = __webpack_require__(9);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('http://localhost:8080');

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Planning Poker'
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Loginform = __webpack_require__(11);

	var _Loginform2 = _interopRequireDefault(_Loginform);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Home',

	  contextTypes: {
	    router: _react2.default.PropTypes.object.isRequired
	  },
	  getInitialState: function getInitialState() {
	    return {
	      inputText: '',
	      error: false
	    };
	  },
	  handleSubmitForm: function handleSubmitForm(e) {
	    e.preventDefault();

	    var name = this.state.inputText;

	    if (!name || name.length <= 3) {
	      this.setState({ error: true });
	      return;
	    }

	    this.context.router.push('lobby/' + name);
	  },
	  handleInputChange: function handleInputChange(e) {
	    this.setState({
	      inputText: e.target.value
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(_Loginform2.default, {
	      onSubmitForm: this.handleSubmitForm,
	      onInputChange: this.handleInputChange,
	      username: this.state.inputText,
	      error: this.state.error
	    });
	  }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (_ref) {
	  var onSubmitForm = _ref.onSubmitForm;
	  var onInputChange = _ref.onInputChange;
	  var username = _ref.username;
	  var error = _ref.error;
	  return _react2.default.createElement(
	    "form",
	    { onSubmit: onSubmitForm },
	    _react2.default.createElement("input", {
	      type: "text",
	      placeholder: "Your name",
	      value: username,
	      onChange: onInputChange
	    }),
	    _react2.default.createElement(
	      "button",
	      null,
	      "Ok"
	    ),
	    error && _react2.default.createElement(
	      "p",
	      null,
	      "Your name has to be at least 4 characters long"
	    )
	  );
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Lobby',
	  getInitialState: function getInitialState() {
	    return {
	      chat: {
	        author: 'qweqwe',
	        message: 'werwer'
	      }
	    };
	  },
	  handleSubmit: function handleSubmit(e) {
	    e.preventDefault();

	    // setState({
	    //   chat.author: this.props.params.name,
	    //   chat.message: this.refs.messageField.value
	    // })
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { className: 'panel primary' },
	        'Deckbox'
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'panel secondary' },
	        _react2.default.createElement(
	          'form',
	          { onSubmit: this.handleSubmit },
	          _react2.default.createElement('input', {
	            ref: 'messageField'
	          })
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'aside' },
	        this.state.chat.author,
	        ': ',
	        this.state.chat.message
	      )
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	exports = module.exports = function (io) {
	  io.on('connection', function (socket) {
	    console.log('asd');
	  });
	};

/***/ }
/******/ ]);