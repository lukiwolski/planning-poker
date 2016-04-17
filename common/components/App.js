import React from 'react'
import { Link } from 'react-router'
import auth from '../utils/auth'

export default React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <ul>
          <li>
            {this.state.loggedIn ? (
              <Link to="/logout">Logout</Link>
              ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li><Link to="/lobby">Dashboard</Link></li>
        </ul>
        {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
      </div>
    )
  }
})
