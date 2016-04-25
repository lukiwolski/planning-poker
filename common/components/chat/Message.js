import React from 'react';

const Message = (props) =>
  <div className="message">
    <strong>{props.user}: </strong>
    <span>{props.text}</span>
  </div>;

Message.propTypes = {
  user: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default Message;
