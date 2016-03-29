import React from 'react'
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Planning Poker</h1>
        {this.props.children}
      </div>
    )
  }
})
