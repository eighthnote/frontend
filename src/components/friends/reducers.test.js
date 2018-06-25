import {
  friends,
  FRIENDS_LOAD,
  getFriends
} from './reducers';
import { LOGOUT } from '../auth/reducers';

const friendsFromDb = [{ _id: '123', name: 'Pilar' }, { _id: '456', name: 'Bailey' }];
const friendsById = { 123: { _id: '123', name: 'Pilar' }, 456: { _id: '456', name: 'Bailey' } };

describe('friends reducer', () => {
  it('has default values of an empty object for its byId reducer and an empty array for its allId reducer', () => {
    const state = friends(undefined, {});
    expect(state.byId).toEqual({});
    expect(state.allIds).toEqual([]);
  });
  
  it('loads friends, storing them in an object with ids as keys and in an array of ids', () => {
    const state = friends({}, { 
      type: FRIENDS_LOAD,
      payload: friendsFromDb
    });
    expect(state.byId).toEqual(friendsById);
    expect(state.allIds).toEqual(['123', '456']);
  });

  it('clears friends on logout', () => {
    const state = friends({ byId: { 123: { _id: '123', name: 'Pilar' } }, allIds: ['123'] }, { type: LOGOUT });
    expect(state.byId).toEqual({});
    expect(state.allIds).toEqual([]);
  });
});

describe('friends selectors', () => {
  it('gets an array of friend objects', () => {
    const friendIds = ['123', '456'];
    const got = getFriends({ friends: { allIds: friendIds, byId: friendsById } });
    expect(got).toEqual(friendsFromDb);
  });
});