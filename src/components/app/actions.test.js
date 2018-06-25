import { clearError } from './actions';
import { ERROR_CLEAR } from './reducers';

describe('action creators', () => {
  it('creates an error clearing action', () => {
    const { type } = clearError();
    expect(type).toBe(ERROR_CLEAR);
  });
});