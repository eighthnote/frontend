export const USER_LOAD = 'USER_LOAD';
export const USER_UPDATE = 'USER_UPDATE';

import { LOGOUT } from '../auth/reducers';

export const getCurrentUser = state => state.user;
export const getGiving = state => state.giving;
export const getGivingArray = state => Object.values(getGiving(state));
export const getRequesting = state => state.requesting;
export const getRequestingArray = state => Object.values(getRequesting(state));

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_LOAD:
      return payload.user;
    case USER_UPDATE:
      return { ...state, ...payload };
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export function giving(state = {}, { type, payload }) {
  switch(type) {
    case USER_LOAD:
      return payload.giving;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export function requesting(state = {}, { type, payload }) {
  switch(type) {
    case USER_LOAD:
      return payload.requesting;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}