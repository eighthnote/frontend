import { getUserProfile, putProfile, postShareable, putShareable, deleteShareable } from '../../services/api';

import {
  PROFILE_LOAD,
  PROFILE_UPDATE,
  GIVING_ADD,
  REQUESTING_ADD,
  GIVING_UPDATE,
  REQUESTING_UPDATE,
  GIVING_REMOVE,
  REQUESTING_REMOVE
} from './reducers';

function shapeProfile(response) {
  const { _id, firstName, lastName, pictureUrl, contact, availability, shareables } = response;
      
  const shareablesMaps = shareables.reduce((maps, item) => {
    if(item.type === 'giving') maps.giving[item._id] = item;
    if(item.type === 'requesting') maps.requesting[item._id] = item;
    return maps;
  }, { giving: {}, requesting: {} });

  const { giving, requesting } = shareablesMaps;
  return {
    profile: {
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
}

export function loadUserProfile() {
  return {
    type: PROFILE_LOAD,
    payload: getUserProfile().then(shapeProfile)
  };
}

export function updateProfile(data) {
  return {
    type: PROFILE_UPDATE,
    payload: putProfile(data).then(() => data)
  };
}

export function updateShareable(shareableId, shareable) {
  const { type: shareableType } = shareable;

  let actionType;
  if(shareableType === 'giving') actionType = GIVING_UPDATE;
  if(shareableType === 'requesting') actionType = REQUESTING_UPDATE;

  return {
    type: actionType,
    payload: putShareable(shareableId, shareable)
  };
}

export function addShareable(shareable) {
  const { type: shareableType } = shareable;

  let actionType;
  if(shareableType === 'giving') actionType = GIVING_ADD;
  if(shareableType === 'requesting') actionType = REQUESTING_ADD;

  return {
    type: actionType,
    payload: postShareable(shareable)
  };
}

export function removeShareable(shareableId, shareableType) {
  let actionType;
  if(shareableType === 'giving') actionType = GIVING_REMOVE;
  if(shareableType === 'requesting') actionType = REQUESTING_REMOVE;

  return {
    type: actionType,
    payload: deleteShareable(shareableId).then(() => ({ _id: shareableId }))
  };
}