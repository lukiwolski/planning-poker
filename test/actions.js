import 'babel-polyfill';
import expect from 'expect';
import * as ActionTypes from '../src/common/actions';

describe('User login action creator test', () => {
  it('Should create an action to login user', () => {
    expect(
      ActionTypes.userLogin('Bonio')
    ).toEqual({
      type: 'USER_LOGIN',
      name: 'Bonio',
    });
  });
});

describe('Adding message action creator test', () => {
  it('Should create an action to add message', () => {
    expect(
      ActionTypes.addMessage('Bonio', 'Shooting star')
    ).toEqual({
      type: 'ADD_MESSAGE',
      author: 'Bonio',
      message: 'Shooting star',
    });
  });
});
