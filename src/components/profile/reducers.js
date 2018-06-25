export const USER_LOAD = 'USER_LOAD';

import { LOGOUT } from '../auth/reducers';

export const getUser = state => state.user;

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_LOAD:
      return payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}