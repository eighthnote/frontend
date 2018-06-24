import {
  USER_AUTH,
  AUTH_CHECKED,
  LOGOUT,
  user,
  checkedAuth,
  getUser,
  getCheckedAuth,
  token
} from './reducers';

const authResponse = { token: '123', user: { name: 'me' } };

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads a user', () => {
    const state = user(null, { type: USER_AUTH, payload: authResponse });
    expect(state).toBe(authResponse.user);
  });

  it('clears a user on logout', () => {
    const state = user(authResponse.user, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('token reducer', () => {
  it('has a default value of null', () => {
    const state = token(undefined, {});
    expect(state).toBe(null);
  });

  it('loads a token', () => {
    const state = token(null, { type: USER_AUTH, payload: authResponse });
    expect(state).toBe(authResponse.token);
  });

  it('clears a token on logout', () => {
    const state = token(authResponse.token, { type: LOGOUT });
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
  it('gets the current user object', () => {
    expect(getUser({ user: authResponse.user })).toBe(authResponse.user);
  });

  it('gets the checked auth status', () => {
    expect(getCheckedAuth({ checkedAuth: true })).toBe(true);
  });
});