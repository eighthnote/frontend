import {
  ACCOUNT_AUTH,
  AUTH_CHECKED,
  LOGOUT,
  checkedAuth,
  getCheckedAuth,
  account,
  getAccount
} from './reducers';

const authResponse = { token: 'abc', _id: '123' };

describe('account reducer', () => {
  it('has a default value of null', () => {
    const state = account(undefined, {});
    expect(state).toBe(null);
  });

  it('loads a account', () => {
    const state = account(null, { type: ACCOUNT_AUTH, payload: authResponse });
    expect(state).toBe(authResponse);
  });

  it('clears a account on logout', () => {
    const state = account(authResponse, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('checked auth reducer', () => {
  it('has a default value of false', () => {
    const state = checkedAuth(undefined, {});
    expect(state).toBe(false);
  });

  it('switches to true', () => {
    const state = checkedAuth(false, { type: AUTH_CHECKED });
    expect(state).toBe(true);
  });
});

describe('selectors', () => {
  it('gets the account', () => {
    expect(getAccount({ account: authResponse })).toBe(authResponse);
  });

  it('gets the checked auth status', () => {
    expect(getCheckedAuth({ checkedAuth: true })).toBe(true);
  });
});