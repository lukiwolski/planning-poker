import React from 'react'

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
