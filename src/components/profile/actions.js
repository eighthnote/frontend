import { getUser } from '../../services/api';

import {
  USER_LOAD
} from './reducers';

export function loadUser(id) {
  return {
    type: USER_LOAD,
    payload: getUser(id).then(user => {
      const { _id, firstName, lastName, pictureUrl, contact, availability, shareables } = user;
      const shareablesMaps = shareables.reduce((maps, item) => {
        if(item.type === 'giving') maps.giving[item._id] = item;
        if(item.type === 'requesting') maps.requesting[item._id] = item;
        return maps;
      }, { giving: {}, requesting: {} });
      const { giving, requesting } = shareablesMaps;
      return {
        user: {
          _id,
          firstName,
          lastName,
          pictureUrl,
          contact,
          availability
        },
        giving,
        requesting
      };
    })
  };
}