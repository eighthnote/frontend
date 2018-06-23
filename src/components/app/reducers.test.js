import {
  LOAD_START,
  LOAD_END,
  ERROR,
  ERROR_CLEAR,
  loading
} from './reducers';

describe('loading reducer', () => {
  it('has a default value of false', () => {
    const state = loading(undefined, {});
    expect(state).toBe(false);
  });
});