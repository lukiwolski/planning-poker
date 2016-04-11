import React from 'react'
import io from 'socket.io-client';
import MessageForm from './MessageForm'
import MessageList from '../components/MessageList'

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
        <MessageForm onMessageSubmit={this.handleMessageSubmit}/>
        <MessageList messages={this.state.messages}/>
      </div>
    )
  }
})
