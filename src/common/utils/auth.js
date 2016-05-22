import cookie from 'react-cookie';

const token = 'token';

class Auth {
  login() {
    return 'aladyn';
  }

  saveToken(name) {
    cookie.save(token, name);
  }

  getToken() {
    return cookie.load(token);
  }

  loggedIn() {
    return !!cookie.load(token);
  }

  logout() {
    cookie.remove(token);
    this.onChange(false);
  }

  onChange() {}
}

export const auth = new Auth();

export const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};
