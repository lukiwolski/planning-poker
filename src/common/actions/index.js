export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = (author, message) => (
  {
    type: ADD_MESSAGE,
    author,
    message,
  }
);

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = (name) => (
  {
    type: USER_LOGIN,
    name,
  }
);
