import { LOGOUT } from '../auth/reducers';

export const FRIENDS_LOAD = 'FRIENDS_LOAD';

export const getFriends = state => state.friends;

export function friends(state = [], { type, payload }) {
  switch(type) {
    case FRIENDS_LOAD:
      return payload;
    case LOGOUT:
      return [];
    default:
      return state;
  }
}