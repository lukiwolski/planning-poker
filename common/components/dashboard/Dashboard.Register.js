import React from 'react'
import { Router } from 'react-router'
import { Link } from 'react-router'
import auth from '../../utils/auth'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(e) {
    e.preventDefault()

    let name = this.refs.first.value
    let last = this.refs.last.value
    let email = this.refs.mail.value
    let pass1 = this.refs.pass.value
    let pass2 = this.refs.passConfirm.value

    if(pass1 !== pass2) {
      this.setState({
        error: "Mismatching password"
      })
    }

    if(pass1 == pass2) {
      let fullName = `${name} ${last}`

      auth.registerUser(fullName, email, pass1)
        .then((user) => {
          let { location } = this.props

          if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname)
          } else {
            this.context.router.replace('/')
          }
        })
        .catch((error) =>{
          this.setState({
            error: error
          })
        })
    }
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="first" placeholder="First name" /></label>
          <label><input ref="last" placeholder="Last name" /></label>
          <label><input ref="mail" placeholder="E-mail" /></label>
          <label><input ref="pass" type="password" /></label>
          <label><input ref="passConfirm" type="password" /></label>

          <button type="submit">register</button>
          {this.state.error}
        </form>
      </div>
    )
  }
})
