import { getFriends,
  putFriends,
  putFriendsAccept,
  deleteFriend
} from '../../services/api';

import {
  FRIENDS_LOAD,
  FRIEND_REQUEST,
  PENDING_FRIEND_REQUEST,
  DELETE_FRIEND
} from './reducers';

export function loadFriends() {
  return {
    type: FRIENDS_LOAD,
    payload: getFriends()
  };
}

export function sendFriendRequest(email) {
  return {
    type: FRIEND_REQUEST,
    payload: putFriends(email)
  };
}

export function acceptFriendRequest(id) {
  return {
    type: PENDING_FRIEND_REQUEST,
    payload: putFriendsAccept(id)
  };
}

export function removeFriend(id) {
  return {
    type: DELETE_FRIEND,
    payload: deleteFriend(id)
  };
}