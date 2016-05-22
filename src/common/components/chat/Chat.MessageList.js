import React from 'react';
import Message from './Chat.Message';

const MessageList = props =>
  <div className="messages">
    <h2> Conversation: </h2>
    {props.messages.map((message, i) =>
      <Message key={i} text={message.text} user={message.user} />)
    }
  </div>;

MessageList.propTypes = {
  messages: React.PropTypes.array,
};

export default MessageList;
