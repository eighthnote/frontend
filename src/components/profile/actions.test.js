jest.mock('../../services/api', () => ({
  getUser: jest.fn(),
  putUser: jest.fn(),
  putShareable: jest.fn()
}));

import {
  USER_LOAD,
  USER_UPDATE,
  SHAREABLE_UPDATE
} from './reducers';

import { loadUser, updateUser, updateShareable } from './actions';

import { getUser, putUser, putShareable } from '../../services/api';

describe('action creators', () => {
  it('creates a user load action with normalized shareables', () => {
    const data = {
      _id: 'a',
      firstName: 'Keli',
      lastName: 'Hansen',
      pictureUrl: 'pix.com',
      contact: ['(555) 555-5555'],
      availability: 'Fridays',
      shareables: [{ _id: '1', type: 'giving' }, { _id: '2', type: 'requesting' }, { _id: '3', type: 'giving' }]
    };

    const results = Promise.resolve(data);
    getUser.mockReturnValueOnce(results);

    const { type, payload } = loadUser('a');
    expect(type).toBe(USER_LOAD);
    expect(payload).resolves.toEqual({ 
      user: { _id: 'a',
        firstName: 'Keli',
        lastName: 'Hansen',
        pictureUrl: 'pix.com',
        contact: ['(555) 555-5555'],
        availability: 'Fridays'
      },
      giving: { 1: { _id: '1', type: 'giving' }, 3: { _id: '3', type: 'giving' } },
      requesting: { 2: { _id: '2', type: 'requesting' } }
    });
  });

  it('creates a user update action', () => {
    putUser.mockReturnValueOnce(Promise.resolve());

    const update = { pictureUrl: 'betterpix.com' };
    const { type, payload } = updateUser('id', update);
    expect(type).toBe(USER_UPDATE);
    expect(payload).resolves.toEqual(update);
  });

  it('creates a shareable update action', () => {
    const data = { description: 'homemade jam' };
    putShareable.mockReturnValueOnce(Promise.resolve(data));

    const { type, payload } = updateShareable('id', '1', data);
    expect(type).toBe(SHAREABLE_UPDATE);
    expect(payload).resolves.toEqual(data);
  });
});