import { combineReducers } from 'redux';

export const FRIENDS_LOAD = 'FRIENDS_LOAD';

function friendsById(state = {}, { type, payload }) {
  switch(type) {
    case FRIENDS_LOAD:
      return payload.reduce((map, friend) => {
        map[friend._id] = friend;
        return map;
      }, {});
    default:
      return state;
  }
}

export const friends = combineReducers({
  byId : friendsById,
  // allIds : allFriends
});