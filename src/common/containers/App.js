import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { auth } from '../utils/auth';

class App extends React.Component {
  constructor() {
    super();
    this.updateAuth = this.updateAuth.bind(this);
    this.state = {
      loggedIn: auth.loggedIn(),
    };
  }

  componentWillMount() {
    // before the component mounts we replace the method on auth object
    // with the one from App component
    // then we check if the user is in the cookies and eventually save it in the state
    auth.onChange = this.updateAuth;
    const userExists = auth.getToken();

    if (userExists) {
      this.setState({
        loggedIn: userExists,
      });
    }
  }

  componentDidMount() {
    // after mounting we either use router to redirect to lobby or to the login screen
    if (!this.state.loggedIn) {
      browserHistory.push('/login');
    } else {
      const { dispatch } = this.props;
      dispatch(actions.userLogin(this.state.loggedIn));
      browserHistory.push('/lobby');
    }
  }

  updateAuth(loggedIn) {
    this.setState({
      loggedIn,
    });
  }

  render() {
    return (
      <div>
          {this.state.loggedIn ? (
            <div>
              <span>You are logged in as: {this.state.loggedIn}</span>
              <Link to="/logout">Logout</Link>
            </div>
          ) : ''}
        {/* Showing current route content when on one of subpages of app */}
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
};

export default connect()(App);
