import {
  USER_LOAD,
  user,
  getCurrentUser,
  giving,
  getGiving,
  getGivingArray,
  requesting,
  getRequesting,
  getRequestingArray
} from './reducers';

import { LOGOUT } from '../auth/reducers';

const userObject = { 
  user: { _id: 'a',
    firstName: 'Keli',
    lastName: 'Hansen',
    pictureUrl: 'pix.com',
    contact: ['(555) 555-5555'],
    availability: 'Fridays'
  },
  giving: { 1: { _id: '1', type: 'giving' }, 3: { _id: '3', type: 'giving' } },
  requesting: { 2: { _id: '2', type: 'requesting' } }
};

describe('user reducer', () => {
  it('has a default value of null', () => {
    const state = user(undefined, {});
    expect(state).toBe(null);
  });

  it('stores a loaded user', () => {
    const state = user(null, { type: USER_LOAD, payload: userObject });
    expect(state).toEqual(userObject.user);
  });

  it('clears a user on logout', () => {
    const state = user(userObject, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('giving reducer', () => {
  it('has a default value of an empty object', () => {
    const state = giving(undefined, {});
    expect(state).toEqual({});
  });

  it('loads giving objects when a user is loaded', () => {
    const state = giving({}, { type: USER_LOAD, payload: userObject });
    expect(state).toEqual(userObject.giving);
  });

  it('clears giving objects on logout', () => {
    const state = giving(userObject.giving, { type: LOGOUT });
    expect(state).toEqual({});
  });
});

describe('requesting reducer', () => {
  it('has a default value of an empty object', () => {
    const state = requesting(undefined, {});
    expect(state).toEqual({});
  });

  it('loads requesting objects when a user is loaded', () => {
    const state = requesting({}, { type: USER_LOAD, payload: userObject });
    expect(state).toEqual(userObject.requesting);
  });

  it('clears requesting objects on logout', () => {
    const state = requesting(userObject.requesting, { type: LOGOUT });
    expect(state).toEqual({});
  });
});

describe('selectors', () => {
  it('gets the current user object', () => {
    expect(getCurrentUser({ user: userObject.user })).toBe(userObject.user);
  });

  it('gets the giving state', () => {
    expect(getGiving({ giving: userObject.giving })).toBe(userObject.giving);
  });

  it('converts the giving object into an array', () => {
    expect(getGivingArray({ giving: userObject.giving })).toEqual([{ _id: '1', type: 'giving' }, { _id: '3', type: 'giving' }]);
  });

  it('gets the requesting state', () => {
    expect(getRequesting({ requesting: userObject.requesting })).toEqual(userObject.requesting);
  });

  it('converts the requesting object into an array', () => {
    expect(getRequestingArray({ requesting: userObject.requesting })).toEqual([{ _id: '2', type: 'requesting' }]);
  });
});