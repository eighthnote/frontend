import { combineReducers } from 'redux';
import { LOGOUT } from '../auth/reducers';

export const FRIENDS_LOAD = 'FRIENDS_LOAD';

export const getFriends = ({ friends }) => friends.allIds.map(id => friends.byId[id]);

function friendsById(state = {}, { type, payload }) {
  switch(type) {
    case FRIENDS_LOAD:
      return payload.reduce((map, friend) => {
        map[friend._id] = friend;
        return map;
      }, {});
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

function allFriends(state = [], { type, payload }) {
  switch(type) {
    case FRIENDS_LOAD:
      return payload.map(friend => friend._id);
    case LOGOUT:
      return [];
    default:
      return state;
  }
}

export const friends = combineReducers({
  byId : friendsById,
  allIds : allFriends
});