import React from 'react'

export default React.createClass({
  getInitialState() {
    return {
      text: ''
    }
  },
  handleSubmit(e) {
    e.preventDefault()

    let message = this.state.text

    this.props.onMessageSubmit(message)
    this.setState({ text: '' })
  },
  changeHandler(e) {
    this.setState({ text : e.target.value })
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.changeHandler}
          value={this.state.text}
          />
      </form>
    )
  }
})
