import React from 'react';
import { auth } from '../utils/auth';
import { browserHistory } from 'react-router';

class Logout extends React.Component {
  constructor() {
    super();
    this.state = {
      countdown: 3,
    };
  }

  componentDidMount() {
    this.countdownInterval = setInterval(() => {
      let { countdown } = this.state;

      this.setState({
        countdown: --countdown,
      });

      if (countdown <= 0) {
        auth.logout();
        browserHistory.push('/');
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countdownInterval);
  }

  render() {
    return (
      <div>
        <p>You are being logged out</p>
        <span>Redirecting in: ...{this.state.countdown}</span>
      </div>
    );
  }
}

export default Logout;
