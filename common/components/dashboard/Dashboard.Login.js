import React from 'react'
import { Router } from 'react-router'
import auth from '../../utils/auth'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    let email = this.refs.email.value
    let pass = this.refs.pass.value

    auth.login(email, pass)
      .then((response) => {
        this.context.router.replace('/lobby')
      })
      .catch(() => {
        return this.setState({ error: true })
      })
  },

  handleFacebook() {
    auth.loginFacebook()
      .then(() => {
        let { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.context.router.replace(location.state.nextPathname)
        } else {
          this.context.router.replace('/')
        }
      })
      .catch(() => {
        return this.setState({ error: true })
      })
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="user@wp.pl" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: user)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
        <button onClick={this.handleFacebook}>Login with Facebook</button>
      </div>
    )
  }
})
