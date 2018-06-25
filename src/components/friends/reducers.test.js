import {
  friends,
  FRIENDS_LOAD
} from './reducers';
import { LOGOUT } from '../auth/reducers';

describe('friends reducer', () => {
  it('has default values of an empty object for its byId reducer and an empty array for its allId reducer', () => {
    const state = friends(undefined, {});
    expect(state.byId).toEqual({});
    expect(state.allIds).toEqual([]);
  });
  
  it('loads friends, storing them in an object with ids as keys and in an array of ids', () => {
    const state = friends({}, { 
      type: FRIENDS_LOAD,
      payload: [{ _id: '123', name: 'Pilar' }, { _id: '456', name: 'Bailey' }]
    });
    expect(state.byId).toEqual({ 123: { _id: '123', name: 'Pilar' }, 456: { _id: '456', name: 'Bailey' } });
    expect(state.allIds).toEqual(['123', '456']);
  });

  it('clears friends on logout', () => {
    const state = friends({ byId: { 123: { _id: '123', name: 'Pilar' } }, allIds: ['123'] }, { type: LOGOUT });
    expect(state.byId).toEqual({});
    expect(state.allIds).toEqual([]);
  });
});