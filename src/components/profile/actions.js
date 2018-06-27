import { getUser, putUser, postShareable, putShareable, deleteShareable } from '../../services/api';

import {
  USER_LOAD,
  USER_UPDATE,
  GIVING_ADD,
  REQUESTING_ADD,
  GIVING_UPDATE,
  REQUESTING_UPDATE,
  GIVING_REMOVE,
  REQUESTING_REMOVE
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

export function updateShareable(id, shareableId, shareable) {
  const { type: shareableType } = shareable;

  let actionType;
  if(shareableType === 'giving') actionType = GIVING_UPDATE;
  if(shareableType === 'requesting') actionType = REQUESTING_UPDATE;

  return {
    type: actionType,
    payload: putShareable(id, shareableId, shareable)
  };
}

export function addShareable(id, shareable) {
  const { type: shareableType } = shareable;

  let actionType;
  if(shareableType === 'giving') actionType = GIVING_ADD;
  if(shareableType === 'requesting') actionType = REQUESTING_ADD;

  return {
    type: actionType,
    payload: postShareable(id, shareable)
  };
}

export function removeShareable(userId, shareableId, shareableType) {
  let actionType;
  if(shareableType === 'giving') actionType = GIVING_REMOVE;
  if(shareableType === 'requesting') actionType = REQUESTING_REMOVE;

  return {
    type: actionType,
    payload: deleteShareable(userId, shareableId).then(() => ({ _id: shareableId }))
  };
}