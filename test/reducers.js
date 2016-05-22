import 'babel-polyfill';
import expect from 'expect';
import { loggedAs, messageList } from '../src/common/reducers';

describe('User login reducer tests', () => {
  it('Should return initial state when wrong action type is passed', () => {
    expect(
      loggedAs({
        name: 'Heinrik',
      }, 'Bullshit')
    ).toEqual({
      name: 'Heinrik',
    });
  });

  it('Should create an object with user name', () => {
    expect(
      loggedAs({}, {
        type: 'USER_LOGIN',
        name: 'Dunder',
      })
    ).toEqual({
      name: 'Dunder',
    });
  });
});

describe('Adding message reducer tests', () => {
  const initialState = [{
    author: 'Marian',
    message: 'Yellow Yellow',
  }];

  it('Should return initial state when wrong action type is passed', () => {
    expect(
      messageList(initialState, {})
    ).toEqual(initialState);
  });

  it('Should add a new message', () => {
    expect(
      messageList(initialState, {
        type: 'ADD_MESSAGE',
        author: 'Lolek',
        message: 'Raider on the lol',
      })
    ).toEqual([
      {
        author: 'Marian',
        message: 'Yellow Yellow',
      },
      {
        author: 'Lolek',
        message: 'Raider on the lol',
      },
    ]);
  });
});
