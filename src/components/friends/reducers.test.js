import {
  friends,
  FRIENDS_LOAD
} from './reducers';

describe('friends reducer', () => {
  it('has a default value of an empty object', () => {
    const state = friends(undefined, {});
    expect(state.byId).toEqual({});
  });
  
  it('loads friends, storing them in an object with ids as keys', () => {
    const state = friends({}, { 
      type: FRIENDS_LOAD,
      payload: [{ _id: '123', name: 'Pilar' }, { _id: '456', name: 'Bailey' }]
    });
    expect(state.byId).toEqual({ 123: { _id: '123', name: 'Pilar' }, 456: { _id: '456', name: 'Bailey' } });
  });
});