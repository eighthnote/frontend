jest.mock('../../services/api', () => ({
  postSignup: jest.fn(),
  postSignin: jest.fn(),
  getAccountVerified: jest.fn()
}));

jest.mock('../../services/request', () => ({
  getStoredToken: jest.fn(),
  clearStoredToken: jest.fn()
}));

import { signup, signin, logout, attemptAccountLoad } from './actions';
import { ACCOUNT_AUTH, AUTH_CHECKED, LOGOUT } from './reducers';
import { postSignup, postSignin, getAccountVerified } from '../../services/api';
import { getStoredToken, clearStoredToken } from '../../services/request';

describe('auth action creators', () => {
  function testAuth(actionType, mockService, actionCreator) {
    it(`creates a ${actionType} action`, () => {
      const promise = Promise.resolve();
      mockService.mockReturnValueOnce(promise);

      const credentials = {};
      const { type, payload } = actionCreator(credentials);
      expect(type).toBe(ACCOUNT_AUTH);
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

  it('creates an action that loads a verified account, if possible', () => {
    const thunk = attemptAccountLoad();
    const dispatch = jest.fn();

    const token = '123';
    getStoredToken.mockReturnValueOnce(token);
    const account = { name: 'me' };
    const verifiedResponse = Promise.resolve(account);
    getAccountVerified.mockReturnValueOnce(verifiedResponse);

    thunk(dispatch)
      .then(() => {
        expect(getAccountVerified.mock.calls[0][0]).toBe('123');
        expect(dispatch.mock.calls.length).toBe(2);
        expect(clearStoredToken.mock.calls.length).toBe(0);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ACCOUNT_AUTH,
          payload: { account, token }
        });
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: AUTH_CHECKED
        });
      });
  });

  it('creates an action that clears a stored account if they can not be verified', () => {
    const thunk = attemptAccountLoad();
    const dispatch = jest.fn();

    const token = 'bad';
    getStoredToken.mockReturnValueOnce(token);
    const verifiedResponse = Promise.reject();
    getAccountVerified.mockReturnValueOnce(verifiedResponse);

    thunk(dispatch)
      .then(() => {
        expect(getAccountVerified.mock.calls[1][0]).toBe('bad');
        expect(dispatch.mock.calls.length).toBe(1);
        expect(clearStoredToken.mock.calls.length).toBe(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: AUTH_CHECKED
        });
      });
  });
});