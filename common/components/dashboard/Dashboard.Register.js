import React from 'react';
import auth from '../../utils/auth';

class Register extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.refs.first.value;
    const last = this.refs.last.value;
    const email = this.refs.mail.value;
    const pass1 = this.refs.pass.value;
    const pass2 = this.refs.passConfirm.value;

    if (pass1 !== pass2) {
      this.setState({
        error: 'Mismatching password',
      });
    }

    if (pass1 === pass2) {
      const fullName = `${name} ${last}`;

      auth.registerUser(fullName, email, pass1)
        .then(() => {
          const { location } = this.props;

          if (location.state && location.state.nextPathname) {
            this.context.router.replace(location.state.nextPathname);
          } else {
            this.context.router.replace('/');
          }
        })
        .catch((error) => {
          this.setState({
            error,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="first" placeholder="First name" /></label>
          <label><input ref="last" placeholder="Last name" /></label>
          <label><input ref="mail" placeholder="E-mail" /></label>
          <label><input ref="pass" type="password" /></label>
          <label><input ref="passConfirm" type="password" /></label>

          <button type="submit">register</button>
          {this.state.error}
        </form>
      </div>
    );
  }
}

Register.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Register.propTypes = {
  location: React.PropTypes.object,
};

export default Register;
