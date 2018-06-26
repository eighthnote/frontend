import {
  friends,
  FRIENDS_LOAD,
  getFriends
} from './reducers';
import { LOGOUT } from '../auth/reducers';

const friendsData = [{ _id: '123', name: 'Pilar' }, { _id: '456', name: 'Bailey' }];

describe('friends reducer', () => {
  it('has default values of an empty array', () => {
    const state = friends(undefined, {});
    expect(state).toEqual([]);
  });
  
  it('loads friends', () => {
    const state = friends([], { type: FRIENDS_LOAD, payload: friendsData });
    expect(state).toEqual(friendsData);
  });

  it('clears friends on logout', () => {
    const state = friends(friendsData, { type: LOGOUT });
    expect(state).toEqual([]);
  });
});

describe('friends selectors', () => {
  it('gets friends', () => {
    const friendIds = ['123', '456'];
    const got = getFriends({ friends: friendIds });
    expect(got).toEqual(friendIds);
  });
});