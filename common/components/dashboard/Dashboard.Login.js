import React from 'react';
import auth from '../../utils/auth';

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
    this.state = {
      error: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const pass = this.refs.pass.value;

    auth.login(email, pass)
      .then(() => {
        this.context.router.replace('/lobby');
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  handleFacebook() {
    auth.loginFacebook()
      .then(() => {
        const { location } = this.props;

        if (location.state && location.state.nextPathname) {
          this.context.router.replace(location.state.nextPathname);
        } else {
          this.context.router.replace('/');
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="user@wp.pl" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: user)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
        <button onClick={this.handleFacebook}>Login with Facebook</button>
      </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Login.propTypes = {
  location: React.PropTypes.object,
};

export default Login;
