import {
  USER_AUTH,
  CHECKED_AUTH,
  LOGOUT,
  user,
  checkedAuth,
  getUser,
  getCheckedAuth
} from './reducers';

const info = { name: 'me' };

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads a user', () => {
    const state = user(null, { type: USER_AUTH, payload: info });
    expect(state).toBe(info);
  });

  it('clears a user on logout', () => {
    const state = user(info, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('checked auth reducer', () => {
  it('has a default value of false', () => {
    const state = checkedAuth(undefined, {});
    expect(state).toBe(false);
  });

  it('switches to true', () => {
    const state = checkedAuth(false, { type: CHECKED_AUTH });
    expect(state).toBe(true);
  });
});

describe('selectors', () => {
  it('gets the current user object', () => {
    expect(getUser({ user: info })).toBe(info);
  });

  it('gets the checked auth status', () => {
    expect(getCheckedAuth({ checkedAuth: true })).toBe(true);
  });
});