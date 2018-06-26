jest.mock('../../services/api', () => ({
  getFriends: jest.fn()
}));

import {
  FRIENDS_LOAD
} from './reducers';

import { loadFriends } from './actions';

import { getFriends } from '../../services/api';

describe('action creators', () => {
  it('creates a load friends action', () => {
    const data = [{ name: 'somebody' }, { name: 'someone' }];
    getFriends.mockReturnValueOnce(Promise.resolve(data));

    const { type, payload } = loadFriends('id');
    expect(type).toBe(FRIENDS_LOAD);
    expect(payload).resolves.toEqual(data);
  });
});