import React from 'react';

class MessageForm extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      text: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const message = {
      user: this.props.user,
      text: this.state.text,
    };

    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.changeHandler}
          value={this.state.text}
        />
      </form>
    );
  }
}

MessageForm.propTypes = {
  user: React.PropTypes.string,
  text: React.PropTypes.string,
  onMessageSubmit: React.PropTypes.func,
};

export default MessageForm;
