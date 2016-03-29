import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      chat: {
        author: 'qweqwe',
        message: 'werwer'
      }
    }
  },
  handleSubmit(e) {
    e.preventDefault();

    // setState({
    //   chat.author: this.props.params.name,
    //   chat.message: this.refs.messageField.value
    // })
  },
  render() {
    return (
      <div>
        <div className="panel primary">Deckbox</div>
        <div className="panel secondary">
          <form onSubmit={this.handleSubmit}>
            <input
              ref="messageField"
              />
          </form>
        </div>
        <div className="aside">{this.state.chat.author}: {this.state.chat.message}</div>
      </div>
    )
  }
})
