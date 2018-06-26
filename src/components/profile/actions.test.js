jest.mock('../../services/api', () => ({
  getUser: jest.fn()
}));

import {
  USER_LOAD
} from './reducers';

import { loadUser } from './actions';

import { getUser } from '../../services/api';

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
});