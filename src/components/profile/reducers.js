export const USER_LOAD = 'USER_LOAD';
export const USER_UPDATE = 'USER_UPDATE';
export const SHAREABLE_UPDATE = 'SHAREABLE_UPDATE';
export const GIVING_ADD = 'GIVING_ADD';
export const REQUESTING_ADD = 'REQUESTING_ADD';

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

function makeShareableReducer(shareableType, addActionType) {
  return (state = {}, { type, payload }) => {
    switch(type) {
      case USER_LOAD:
        return payload[shareableType];
      case addActionType:
      case SHAREABLE_UPDATE:
        return { ...state, [payload._id]: payload };
      case LOGOUT:
        return {};
      default:
        return state;
    }
  };
}

export const giving = makeShareableReducer('giving', GIVING_ADD);
export const requesting = makeShareableReducer('requesting', REQUESTING_ADD);