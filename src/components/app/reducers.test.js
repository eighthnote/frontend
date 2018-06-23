import {
  LOAD_START,
  LOAD_END,
  ERROR,
  ERROR_CLEAR,
  loading,
  error
} from './reducers';

describe('loading reducer', () => {
  it('has a default value of false', () => {
    const state = loading(undefined, {});
    expect(state).toBe(false);
  });

  it('switches loading state to true when loading starts', () => {
    const state = loading(false, { type: LOAD_START });
    expect(state).toBe(true);
  });

  it('reverts loading state to false when loading ends', () => {
    const state = loading(true, { type: LOAD_END });
    expect(state).toBe(false);
  });
});

describe('error reducer', () => {
  it('has a default value of null', () => {
    const state = error(undefined, {});
    expect(state).toBe(null);
  });
});