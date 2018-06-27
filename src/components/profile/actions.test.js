jest.mock('../../services/api', () => ({
  getProfile: jest.fn(),
  putProfile: jest.fn(),
  postShareable: jest.fn(),
  putShareable: jest.fn(),
  deleteShareable: jest.fn()
}));

import {
  PROFILE_LOAD,
  PROFILE_UPDATE,
  GIVING_ADD,
  GIVING_UPDATE,
  GIVING_REMOVE
} from './reducers';

import { loadAccount, updateAccount, addShareable, updateShareable, removeShareable } from './actions';

import { getProfile, putProfile, postShareable, putShareable, deleteShareable } from '../../services/api';

describe('action creators', () => {
  it('creates a profile load action with normalized shareables', () => {
    const data = {
      _id: 'a',
      firstName: 'Keli',
      lastName: 'Hansen',
      pictureUrl: 'pix.com',
      contact: ['(555) 555-5555'],
      availability: 'Fridays',
      shareables: [{ _id: '1', type: 'giving' }, { _id: '2', type: 'requesting' }, { _id: '3', type: 'giving' }]
    };

    getProfile.mockReturnValueOnce(Promise.resolve(data));

    const { type, payload } = loadAccount('a');
    expect(type).toBe(PROFILE_LOAD);
    expect(payload).resolves.toEqual({ 
      profile: { _id: 'a',
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

  it('creates a profile update action', () => {
    putProfile.mockReturnValueOnce(Promise.resolve());

    const update = { pictureUrl: 'betterpix.com' };
    const { type, payload } = updateAccount('id', update);
    expect(type).toBe(PROFILE_UPDATE);
    expect(payload).resolves.toEqual(update);
  });

  it('creates a shareable update action', () => {
    const data = { type: 'giving', description: 'homemade jam' };
    putShareable.mockReturnValueOnce(Promise.resolve(data));

    const { type, payload } = updateShareable('id', '1', data);
    expect(type).toBe(GIVING_UPDATE);
    expect(payload).resolves.toEqual(data);
  });

  it('creates a shareable add action', () => {
    const data = { type: 'giving', description: 'woodworking' };
    postShareable.mockReturnValueOnce(Promise.resolve({ ...data, _id: '5' }));

    const { type, payload } = addShareable('id', data);
    expect(type).toBe(GIVING_ADD);
    expect(payload).resolves.toEqual({ ...data, _id: '5' });
  });

  it('creates a shareable remove action', () => {
    deleteShareable.mockReturnValueOnce(Promise.resolve());

    const _id = '1';
    const { type, payload } = removeShareable('id', _id, 'giving');
    expect(type).toBe(GIVING_REMOVE);
    expect(payload).resolves.toEqual({ _id });
  });
});