import { LOGOUT } from '../auth/reducers';

export const FRIENDS_LOAD = 'FRIENDS_LOAD';
export const FRIEND_REQUEST = 'FRIEND_REQUEST';
export const PENDING_FRIEND_REQUEST = 'PENDING_FRIEND_REQUEST';
export const DELETE_FRIEND = 'DELETE_FRIEND';

export const getFriends = state => state.friends;
export const getFriendRequest = state => state.friendRequest;

export function friends(state = {}, { type, payload }) {
  switch(type) {
    case FRIENDS_LOAD:
      return payload;
    case LOGOUT:
      return {};
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

export function pendingFriendRequest(state = null, { type, payload }) {
  switch(type) {
    case PENDING_FRIEND_REQUEST:
      return payload;
    default:
      return state;
  }
}

export function removeFriend(state = null, { type, payload }) {
  switch(type) {
    case DELETE_FRIEND:
      return payload;
    default:
      return state;
  }
}