import React from 'react';
import io from 'socket.io-client';
import MessageList from '../components/chat/Chat.MessageList';
import MessageForm from '../components/chat/Chat.MessageForm';

const socket = io('');

class ChatContainer extends React.Component {
  constructor() {
    super();
    this.messageRecieve = this.messageRecieve.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    socket.on('send:message', this.messageRecieve);
  }

  messageRecieve(message) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
  }

  handleMessageSubmit(message) {
    const { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
    socket.emit('send:message', message);
  }

  render() {
    return (
      <div>
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.props.user}
        />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

ChatContainer.propTypes = {
  user: React.PropTypes.string,
};

export default ChatContainer;
