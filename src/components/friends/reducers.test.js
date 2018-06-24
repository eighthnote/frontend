import {
  friends

} from './reducers';

describe('friends reducer', () => {
  it('has a default value of an empty object', () => {
    const state = friends(undefined, {});
    expect(state).toEqual({});
  });
  
});