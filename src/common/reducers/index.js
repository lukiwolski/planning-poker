import { combineReducers } from 'redux';
import * as ActionTypes from '../actions';

const newMessage = (author, message) => (
  {
    author,
    message,
  }
);

export const messageList = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_MESSAGE:
      return [
        ...state,
        newMessage(action.author, action.message),
      ];
    default:
      return state;
  }
};

export const loggedAs = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOGIN:
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};
