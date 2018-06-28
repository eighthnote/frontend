import { getFriends, putFriends } from '../../services/api';

import {
  FRIENDS_LOAD,
  FRIEND_REQUEST
} from './reducers';

export function loadFriends(id) {
  return {
    type: FRIENDS_LOAD,
    payload: getFriends(id)
  };
}

export function sendFriendRequest(email) {
  return {
    type: FRIEND_REQUEST,
    payload: putFriends(email)
  };
}