import { getUser, putUser, putShareable, postShareable } from '../../services/api';

import {
  USER_LOAD,
  USER_UPDATE,
  SHAREABLE_UPDATE,
  GIVING_ADD,
  REQUESTING_ADD
} from './reducers';

export function loadUser(id) {
  return {
    type: USER_LOAD,
    payload: getUser(id).then(body => {
      const { _id, firstName, lastName, pictureUrl, contact, availability, shareables } = body;
      
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

export function updateUser(id, data) {
  return {
    type: USER_UPDATE,
    payload: putUser(id, data).then(() => data)
  };
}

export function updateShareable(id, shareableId, data) {
  return {
    type: SHAREABLE_UPDATE,
    payload: putShareable(id, shareableId, data)
  };
}

export function addShareable(id, shareable) {
  const { shareable: { type: shareableType } } = shareable;

  let actionType;
  if(shareableType === 'giving') actionType = GIVING_ADD;
  if(shareableType === 'requesting') actionType = REQUESTING_ADD;

  return {
    type: actionType,
    payload: postShareable(id, shareable)
  };
}