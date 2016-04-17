import React from 'react'
import auth from '../../utils/auth'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount() {
    auth.logout()

    let { location } = this.props

    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname)
    } else {
      this.context.router.replace('/')
    }
  },

  render() {
    return <p>You are now Logged out</p>
  }
})
