jest.mock('../../services/api', () => ({
  postSignup: jest.fn(),
  postSignin: jest.fn(),
  getUserVerified: jest.fn()
}));

jest.mock('../../services/request', () => ({
  getStoredToken: jest.fn(),
  clearStoredToken: jest.fn()
}));

import { signup, signin, logout, attemptUserLoad } from './actions';
import { USER_AUTH, AUTH_CHECKED, LOGOUT } from './reducers';
import { postSignup, postSignin, getUserVerified } from '../../services/api';
import { getStoredToken, clearStoredToken } from '../../services/request';

describe('auth action creators', () => {
  function testAuth(actionType, mockService, actionCreator) {
    it(`creates a ${actionType} action`, () => {
      const promise = Promise.resolve();
      mockService.mockReturnValueOnce(promise);

      const credentials = {};
      const { type, payload } = actionCreator(credentials);
      expect(type).toBe(USER_AUTH);
      expect(payload).toBe(promise);
      expect(mockService.mock.calls.length).toBe(1);
      expect(mockService.mock.calls[0][0]).toBe(credentials);
    });
  }

  testAuth('signup', postSignup, signup);
  testAuth('signin', postSignin, signin);

  it('creates a logout action', () => {
    const { type } = logout();
    expect(type).toBe(LOGOUT);
  });

  it('creates an action that loads a verified user, if possible', () => {
    const thunk = attemptUserLoad();
    const dispatch = jest.fn();

    const token = '123';
    getStoredToken.mockReturnValueOnce(token);
    const user = { name: 'me' };
    const verifiedResponse = Promise.resolve(user);
    getUserVerified.mockReturnValueOnce(verifiedResponse);

    thunk(dispatch)
      .then(() => {
        expect(getUserVerified.mock.calls[0][0]).toBe('123');
        expect(dispatch.mock.calls.length).toBe(2);
        expect(clearStoredToken.mock.calls.length).toBe(0);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: USER_AUTH,
          payload: { user, token }
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: AUTH_CHECKED
        });
      });
  });

  it('creates an action that clears a stored user if they can not be verified', () => {
    const thunk = attemptUserLoad();
    const dispatch = jest.fn();

    const token = 'bad';
    getStoredToken.mockReturnValueOnce(token);
    const verifiedResponse = Promise.reject();
    getUserVerified.mockReturnValueOnce(verifiedResponse);

    thunk(dispatch)
      .then(() => {
        expect(getUserVerified.mock.calls[1][0]).toBe('bad');
        expect(dispatch.mock.calls.length).toBe(1);
        expect(clearStoredToken.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: AUTH_CHECKED
        });
      });
  });
});