import React from 'react'
import Chat from '../chat/Message.container'
import auth from '../../utils/auth'

export default React.createClass({
  render() {
    const name = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it as: {name}</p>
        <Chat user={name} />
      </div>
    )
  }
})
