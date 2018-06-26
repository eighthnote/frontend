import { get, post, put } from './request';

const URL = '/api';
const USERS_URL = `${URL}/users`;
const AUTH_URL = `${URL}/auth`;

// populate shareables?
export const getUser = id => get(`${USERS_URL}/${id}`);
export const putUser = (id, data) => put(`${USERS_URL}/${id}`, data);

export const getFriends = id => get(`${USERS_URL}/${id}/friends`);
// pending friends?
// deleting friends?

export const postShareable = (id, shareable) => post(`${USERS_URL}/${id}/shareables`, shareable);
export const putShareable = (id, shareableId, data) => put(`${USERS_URL}/${id}/shareables/${shareableId}`, data);

export const getFeed = id => get(`${USERS_URL}/${id}/feed`);

export const postSignin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const postSignup = credentials => post(`${AUTH_URL}/signup`, credentials);
export const getUserVerified = token => get(`${AUTH_URL}/verify`, {
  headers: {
    headers: {
      Authorization: token
    }
  }
});