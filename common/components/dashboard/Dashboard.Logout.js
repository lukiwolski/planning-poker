import React from 'react';
import auth from '../../utils/auth';

class Logout extends React.Component {
  componentDidMount() {
    auth.logout();

    const { location } = this.props;

    if (location.state && location.state.nextPathname) {
      this.context.router.replace(location.state.nextPathname);
    } else {
      this.context.router.replace('/');
    }
  }

  render() {
    return <p>You are now Logged out</p>;
  }
}

Logout.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Logout.propTypes = {
  location: React.PropTypes.object,
};

export default Logout;
