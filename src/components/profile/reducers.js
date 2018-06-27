export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const GIVING_ADD = 'GIVING_ADD';
export const REQUESTING_ADD = 'REQUESTING_ADD';
export const GIVING_UPDATE = 'GIVING_UPDATE';
export const REQUESTING_UPDATE = 'REQUESTING_UPDATE';
export const GIVING_REMOVE = 'GIVING_REMOVE';
export const REQUESTING_REMOVE = 'REQUESTING_REMOVE';

import { LOGOUT } from '../auth/reducers';

export const getProfile = state => state.profile;
export const getGiving = state => state.giving;
export const getGivingArray = state => Object.values(getGiving(state));
export const getRequesting = state => state.requesting;
export const getRequestingArray = state => Object.values(getRequesting(state));

export function profile(state = null, { type, payload }) {
  switch(type) {
    case PROFILE_LOAD:
      return payload.profile;
    case PROFILE_UPDATE:
      return { ...state, ...payload };
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

function makeShareableReducer(shareableType, addActionType, updateActionType, removeActionType) {
  return (state = {}, { type, payload }) => {
    switch(type) {
      case PROFILE_LOAD:
        return payload[shareableType];
      case addActionType:
      case updateActionType:
        return { ...state, [payload._id]: payload };
      case removeActionType: {
        const copy = { ...state };
        delete copy[payload._id];
        return copy;
      }
      case LOGOUT:
        return {};
      default:
        return state;
    }
  };
}

export const giving = makeShareableReducer('giving', GIVING_ADD, GIVING_UPDATE, GIVING_REMOVE);
export const requesting = makeShareableReducer('requesting', REQUESTING_ADD, REQUESTING_UPDATE, REQUESTING_REMOVE);