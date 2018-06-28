import { LOGOUT } from '../auth/reducers';

export const FEED_LOAD = 'FEED_LOAD';

export const getFeed = state => state.feed;

export function feed(state = [], { type, payload }) {
  switch(type) {
    case FEED_LOAD:
      return payload;
    case LOGOUT:
      return [];
    default:
      return state;
  }
}
