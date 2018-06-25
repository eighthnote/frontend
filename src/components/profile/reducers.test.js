import {
  USER_LOAD,
  user,
  getUser
} from './reducers';

import { LOGOUT } from '../auth/reducers';

const userObject = { firstName: 'Jane' };

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('loads a user', () => {
    const state = user(null, { type: USER_LOAD, payload: userObject });
    expect(state).toBe(userObject);
  });

  it('clears a user on logout', () => {
    const state = user(userObject, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('selectors', () => {
  it('gets the current user object', () => {
    expect(getUser({ user: userObject })).toBe(userObject);
  });
});