import {
  USER_AUTH,
  CHECKED_AUTH,
  LOGOUT,
  user
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