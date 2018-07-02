import {
  friends,
  FRIENDS_LOAD,
  getFriends
} from './reducers';
import { LOGOUT } from '../auth/reducers';

const friendsData = {
  friends: [{ _id: '123', name: 'Pilar' }, { _id: '456', name: 'Bailey' }],
  pendingFriends: [{ _id: '789', name: 'Betsy' }]
};

describe('friends reducer', () => {
  it('has default values of an empty object', () => {
    const state = friends(undefined, {});
    expect(state).toEqual({});
  });
  
  it('loads friends', () => {
    const state = friends({}, { type: FRIENDS_LOAD, payload: friendsData });
    expect(state).toEqual(friendsData);
  });

  it('clears friends on logout', () => {
    const state = friends(friendsData, { type: LOGOUT });
    expect(state).toEqual({});
  });
});

describe('friends selectors', () => {
  it('gets friends', () => {
    const got = getFriends({ friends: friendsData });
    expect(got).toEqual(friendsData);
  });
});