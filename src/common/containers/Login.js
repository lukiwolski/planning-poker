import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import * as actions from '../actions';
import { auth } from '../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.state = {
      error: false,
      inputValue: '',
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;

    // todo: add before dispatching search the store to see
    // if user with the same name already exists
    const { inputValue } = this.state;
    if (inputValue.length >= 3) {
      dispatch(actions.userLogin(inputValue));
      auth.saveToken(inputValue);
      auth.onChange(inputValue);
      browserHistory.push('/lobby');
    } else {
      this.setState({
        error: 'Your username needs to be at least 3 letters long',
      });
    }
  }

  validateInput(event) {
    event.preventDefault();
    this.setState({
      inputValue: this.refs.inputField.value.replace(/[^a-zA-Z]/g, ''),
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome To Planning Poker</h1>
        <h2>Login in to proceed</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              ref="inputField"
              placeholder="Choose a handle"
              onChange={this.validateInput}
              value={this.state.inputValue}
            />
          </label>
          <button type="submit">login</button>
        </form>
        {this.state.error}
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect()(Login);
