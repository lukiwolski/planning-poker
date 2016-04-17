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

	var _reactCookie = __webpack_require__(8);

	var _reactCookie2 = _interopRequireDefault(_reactCookie);

	var _cookieParser = __webpack_require__(9);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _routes = __webpack_require__(10);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = (0, _express2.default)();

	app.use((0, _cookieParser2.default)());
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
	      _reactCookie2.default.plugToRequest(req, res);
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	var http = __webpack_require__(23).Server(app);
	var io = (0, _socket2.default)(http);

	io.on('connection', function (socket) {
	  console.log('a user connected');

	  socket.on('send:message', function (msg) {
	    socket.broadcast.emit('send:message', msg);
	  });
	});

	function renderPage(appHtml) {
	  return '\n  <!doctype html public="storage">\n  <html>\n    <meta charset=utf-8/>\n    <title>Planning Poker</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n    ';
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
/***/ function(module, exports) {

	module.exports = require("react-cookie");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _App = __webpack_require__(11);

	var _App2 = _interopRequireDefault(_App);

	var _Dashboard = __webpack_require__(14);

	var _Dashboard2 = _interopRequireDefault(_Dashboard);

	var _Dashboard3 = __webpack_require__(15);

	var _Dashboard4 = _interopRequireDefault(_Dashboard3);

	var _Dashboard5 = __webpack_require__(16);

	var _Dashboard6 = _interopRequireDefault(_Dashboard5);

	var _Lobby = __webpack_require__(17);

	var _Lobby2 = _interopRequireDefault(_Lobby);

	var _auth = __webpack_require__(12);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function requireAuth(nextState, replace) {
	  if (!_auth2.default.loggedIn()) {
	    replace({
	      pathname: '/login',
	      state: { nextPathname: nextState.location.pathname }
	    });
	  }
	}

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Dashboard2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/logout', component: _Dashboard4.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/lobby', component: _Lobby2.default, onEnter: requireAuth }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/dashboard', component: _Dashboard6.default })
	);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _auth = __webpack_require__(12);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  getInitialState: function getInitialState() {
	    return {
	      loggedIn: _auth2.default.loggedIn()
	    };
	  },
	  updateAuth: function updateAuth(loggedIn) {
	    this.setState({
	      loggedIn: loggedIn
	    });
	  },
	  componentWillMount: function componentWillMount() {
	    _auth2.default.onChange = this.updateAuth;
	    _auth2.default.login();
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          this.state.loggedIn ? _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/logout' },
	            'Logout'
	          ) : _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/login' },
	            'Login'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/lobby' },
	            'Dashboard'
	          )
	        )
	      ),
	      this.props.children || _react2.default.createElement(
	        'p',
	        null,
	        'You are ',
	        !this.state.loggedIn && 'not',
	        ' logged in.'
	      )
	    );
	  }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _firebase = __webpack_require__(13);

	var _firebase2 = _interopRequireDefault(_firebase);

	var _reactCookie = __webpack_require__(8);

	var _reactCookie2 = _interopRequireDefault(_reactCookie);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var firebaseRef = new _firebase2.default('https://blinding-fire-4472.firebaseio.com');
	var token = 'token';

	module.exports = {
	  login: function login(email, pass) {
	    var _this = this,
	        _arguments = arguments;

	    return new Promise(function (resolve, reject) {
	      if (_reactCookie2.default.load(token)) {
	        _this.onChange(true);
	      }
	      if (_arguments.length) {
	        firebaseRef.authWithPassword({
	          "email": email,
	          "password": pass
	        }, function (error, authData) {
	          if (error) {
	            _this.onChange(false);
	            reject(error);
	          } else {
	            _reactCookie2.default.save(token, authData);
	            _this.onChange(true);
	            resolve(authData);
	          }
	        });
	      }
	    });
	  },
	  loginFacebook: function loginFacebook(cb) {
	    var _this2 = this;

	    return new Promise(function (resolve, reject) {
	      firebaseRef.authWithOAuthPopup("facebook", function (error, authData) {
	        if (error) {
	          _this2.onChange(false);
	          reject(error);
	        } else {
	          _reactCookie2.default.save(token, authData);
	          _this2.onChange(true);
	          resolve(authData);
	        }
	      });
	    });
	  },
	  getToken: function getToken() {
	    return _reactCookie2.default.load(token);
	  },
	  loggedIn: function loggedIn() {
	    return !!_reactCookie2.default.load(token);
	  },
	  logout: function logout() {
	    _reactCookie2.default.remove(token);
	    this.onChange(false);
	  },
	  onChange: function onChange() {}
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("firebase");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(6);

	var _auth = __webpack_require__(12);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Dashboard.Login',

	  contextTypes: {
	    router: _react2.default.PropTypes.object.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      error: false
	    };
	  },
	  handleSubmit: function handleSubmit(event) {
	    var _this = this;

	    event.preventDefault();

	    var email = this.refs.email.value;
	    var pass = this.refs.pass.value;

	    _auth2.default.login(email, pass).then(function (response) {
	      _this.context.router.replace('/lobby');
	    }).catch(function () {
	      return _this.setState({ error: true });
	    });
	  },
	  handleFacebook: function handleFacebook() {
	    var _this2 = this;

	    _auth2.default.loginFacebook().then(function () {
	      var location = _this2.props.location;


	      if (location.state && location.state.nextPathname) {
	        _this2.context.router.replace(location.state.nextPathname);
	      } else {
	        _this2.context.router.replace('/');
	      }
	    }).catch(function () {
	      return _this2.setState({ error: true });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'form',
	        { onSubmit: this.handleSubmit },
	        _react2.default.createElement(
	          'label',
	          null,
	          _react2.default.createElement('input', { ref: 'email', placeholder: 'email', defaultValue: 'user@wp.pl' })
	        ),
	        _react2.default.createElement(
	          'label',
	          null,
	          _react2.default.createElement('input', { ref: 'pass', placeholder: 'password' })
	        ),
	        ' (hint: user)',
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          'button',
	          { type: 'submit' },
	          'login'
	        ),
	        this.state.error && _react2.default.createElement(
	          'p',
	          null,
	          'Bad login information'
	        )
	      ),
	      _react2.default.createElement(
	        'button',
	        { onClick: this.handleFacebook },
	        'Login with Facebook'
	      )
	    );
	  }
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _auth = __webpack_require__(12);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Dashboard.Logout',

	  contextTypes: {
	    router: _react2.default.PropTypes.object.isRequired
	  },

	  componentDidMount: function componentDidMount() {
	    _auth2.default.logout();

	    var location = this.props.location;


	    if (location.state && location.state.nextPathname) {
	      this.context.router.replace(location.state.nextPathname);
	    } else {
	      this.context.router.replace('/');
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'p',
	      null,
	      'You are now Logged out'
	    );
	  }
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  return _react2.default.createElement(
	    'div',
	    null,
	    'yooyoyo'
	  );
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Message = __webpack_require__(18);

	var _Message2 = _interopRequireDefault(_Message);

	var _auth = __webpack_require__(12);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Lobby.Container',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Dashboard'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        'You made it!'
	      )
	    );
	  }
	});

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _socket = __webpack_require__(19);

	var _socket2 = _interopRequireDefault(_socket);

	var _MessageForm = __webpack_require__(20);

	var _MessageForm2 = _interopRequireDefault(_MessageForm);

	var _MessageList = __webpack_require__(21);

	var _MessageList2 = _interopRequireDefault(_MessageList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var socket = (0, _socket2.default)('');

	exports.default = _react2.default.createClass({
	  displayName: 'Message.container',
	  getInitialState: function getInitialState() {
	    return {
	      messages: []
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
/* 19 */
/***/ function(module, exports) {

	module.exports = require("socket.io-client");

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _Message = __webpack_require__(22);

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
/* 22 */
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
/* 23 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ }
/******/ ]);