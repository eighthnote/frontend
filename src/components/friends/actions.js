import { getFriends } from '../../services/api';

import {
  FRIENDS_LOAD
} from './reducers';

export function loadFriends(id) {
  return {
    type: FRIENDS_LOAD,
    payload: getFriends(id)
  };
}