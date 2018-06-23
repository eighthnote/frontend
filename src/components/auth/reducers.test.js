import {
  USER_AUTH,
  CHECKED_AUTH,
  LOGOUT,
  user,
  checkedAuth
} from './reducers';

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads a user', () => {
    const info = { email: 'me@me.me', password: 'abc' };
    const state = user(null, { type: USER_AUTH, payload: info });
    expect(state).toBe(info);
  });

  it('clears a user on logout', () => {
    const state = user({}, { type: LOGOUT });
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