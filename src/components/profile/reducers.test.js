import {
  PROFILE_LOAD,
  PROFILE_UPDATE,
  GIVING_ADD,
  REQUESTING_ADD,
  GIVING_UPDATE,
  REQUESTING_UPDATE,
  GIVING_REMOVE,
  REQUESTING_REMOVE,
  profile,
  getProfile,
  giving,
  getGiving,
  getGivingArray,
  requesting,
  getRequesting,
  getRequestingArray
} from './reducers';

import { LOGOUT } from '../auth/reducers';

const profileObject = { 
  profile: { _id: 'a',
    firstName: 'Keli',
    lastName: 'Hansen',
    pictureUrl: 'pix.com',
    contact: ['(555) 555-5555'],
    availability: 'Fridays'
  },
  giving: { 1: { _id: '1', type: 'giving' }, 3: { _id: '3', type: 'giving' } },
  requesting: { 2: { _id: '2', type: 'requesting' } }
};

describe('profile reducer', () => {
  it('has a default value of null', () => {
    const state = profile(undefined, {});
    expect(state).toBe(null);
  });

  it('stores a loaded profile', () => {
    const state = profile(null, { type: PROFILE_LOAD, payload: profileObject });
    expect(state).toEqual(profileObject.profile);
  });

  it('updates a profile', () => {
    const update = { pictureUrl: 'betterpix.com' };
    const state = profile(profileObject.profile, { type: PROFILE_UPDATE, payload: update });
    expect(state).toEqual({ ...profileObject.profile, ...update });
  });

  it('clears a profile on logout', () => {
    const state = profile(profileObject, { type: LOGOUT });
    expect(state).toBe(null);
  });
});

describe('giving reducer', () => {
  it('has a default value of an empty object', () => {
    const state = giving(undefined, {});
    expect(state).toEqual({});
  });

  it('loads giving objects when a profile is loaded', () => {
    const state = giving({}, { type: PROFILE_LOAD, payload: profileObject });
    expect(state).toEqual(profileObject.giving);
  });

  it('adds a giving object', () => {
    const addition = { _id: '4', type: 'giving' };
    const state = giving(profileObject.giving, { type: GIVING_ADD, payload: addition });
    expect(state).toEqual({ ...profileObject.giving, [addition._id]: addition });
  });

  it('updates a giving object', () => {
    const update = { _id: '1', type: 'giving', description: 'homemade jam' };
    const state = giving(profileObject.giving, { type: GIVING_UPDATE, payload: update });
    expect(state).toEqual({ ...profileObject.giving, [update._id]: update });
  });

  it('removes a giving object', () => {
    const state = giving(profileObject.giving, { type: GIVING_REMOVE, payload: { _id: '1' } });
    expect(state).toEqual({ 3: { _id: '3', type: 'giving' } });
  });

  it('clears giving objects on logout', () => {
    const state = giving(profileObject.giving, { type: LOGOUT });
    expect(state).toEqual({});
  });
});

describe('requesting reducer', () => {
  it('has a default value of an empty object', () => {
    const state = requesting(undefined, {});
    expect(state).toEqual({});
  });

  it('loads requesting objects when a profile is loaded', () => {
    const state = requesting({}, { type: PROFILE_LOAD, payload: profileObject });
    expect(state).toEqual(profileObject.requesting);
  });

  it('adds a requesting object', () => {
    const addition = { _id: '5', type: 'requesting' };
    const state = requesting(profileObject.requesting, { type: REQUESTING_ADD, payload: addition });
    expect(state).toEqual({ ...profileObject.requesting, [addition._id]:addition });
  });

  it('updates a requesting object', () => {
    const update = { _id: '2', type: 'requesting', description: 'homemade jam' };
    const state = requesting(profileObject.requesting, { type: REQUESTING_UPDATE, payload: update });
    expect(state).toEqual({ ...profileObject.requesting, [update._id]:update });
  });

  it('removes a requesting object', () => {
    const state = requesting(profileObject.requesting, { type: REQUESTING_REMOVE, payload: { _id: '2' } });
    expect(state).toEqual({});
  });

  it('clears requesting objects on logout', () => {
    const state = requesting(profileObject.requesting, { type: LOGOUT });
    expect(state).toEqual({});
  });
});

describe('selectors', () => {
  it('gets the current profile object', () => {
    expect(getProfile({ profile: profileObject.profile })).toBe(profileObject.profile);
  });

  it('gets the giving state', () => {
    expect(getGiving({ giving: profileObject.giving })).toBe(profileObject.giving);
  });

  it('converts the giving object into an array', () => {
    expect(getGivingArray({ giving: profileObject.giving })).toEqual([{ _id: '1', type: 'giving' }, { _id: '3', type: 'giving' }]);
  });

  it('gets the requesting state', () => {
    expect(getRequesting({ requesting: profileObject.requesting })).toEqual(profileObject.requesting);
  });

  it('converts the requesting object into an array', () => {
    expect(getRequestingArray({ requesting: profileObject.requesting })).toEqual([{ _id: '2', type: 'requesting' }]);
  });
});