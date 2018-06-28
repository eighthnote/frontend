import { LOGOUT } from '../auth/reducers';

export const FRIENDS_LOAD = 'FRIENDS_LOAD';
export const FRIEND_REQUEST = 'FRIEND_REQUEST';

export const getFriends = state => state.friends;
export const getFriendRequest = state => state.friendRequest;

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

export function friendRequest(state = null, { type, payload }) {
  switch(type) {
    case FRIEND_REQUEST:
      return payload;
    default:
      return state;
  }
}