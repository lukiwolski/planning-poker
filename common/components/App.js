import React from 'react';
import { Link } from 'react-router';
import auth from '../utils/auth';

class App extends React.Component {
  constructor() {
    super();
    this.updateAuth = this.updateAuth.bind(this);
    this.state = {
      loggedIn: auth.loggedIn(),
    };
  }

  componentWillMount() {
    auth.onChange = this.updateAuth;
    auth.login();
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn,
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.loggedIn ? (
            <li><Link to="/logout">Logout</Link></li>
            ) : (
            [
              <li key="1"><Link to="/login">Login</Link></li>,
              <li key="2"><Link to="/register">Register</Link></li>,
            ]
          )}
          <li><Link to="/lobby">Dashboard</Link></li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
