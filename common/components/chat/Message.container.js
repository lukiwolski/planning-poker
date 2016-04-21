import React from 'react'
import io from 'socket.io-client';
import MessageForm from './MessageForm'
import MessageList from './MessageList'

const socket = io('')

export default React.createClass({
  getInitialState() {
    return {
      messages: []
    }
  },
  componentDidMount() {
    socket.on('send:message', this.messageRecieve)
  },
  messageRecieve(message) {
    let {messages} = this.state
    messages.push(message)
    this.setState({messages})
  },
  handleMessageSubmit(message) {
    let {messages} = this.state
    messages.push(message)
    this.setState({messages})
    socket.emit('send:message', message)
  },
  render() {
    return (
      <div>
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.props.user}
        />
        <MessageList messages={this.state.messages}/>
      </div>
    )
  }
})
