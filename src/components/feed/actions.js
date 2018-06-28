import { getFeed } from '../../services/api';

import { FEED_LOAD } from './reducers';

export function loadFeed() {
  return {
    type: FEED_LOAD,
    payload: getFeed()
  };
}