import { get, post, put, del } from './request';

const URL = '/api';
const PROFILE_URL = `${URL}/profile`;

// populate shareables?
export const getUserProfile = () => get(PROFILE_URL);
export const putProfile = data => put(PROFILE_URL, data);

export const getFriends = () => get(`${PROFILE_URL}/friends`);
// pending friends?
// deleting friends?

// return new
export const postShareable = shareable => post(`${PROFILE_URL}/shareables`, shareable);
export const putShareable = (shareableId, data) => put(`${PROFILE_URL}/shareables/${shareableId}`, data);
export const deleteShareable = (shareableId) => del(`${PROFILE_URL}/shareables/${shareableId}`);

export const getFeed = () => get(`${PROFILE_URL}/feed`);

export const postSignin = credentials => post(`${URL}/signin`, credentials);
export const postSignup = credentials => post(`${URL}/signup`, credentials);
export const getAccountVerified = token => get(`${URL}/verify`, {
  headers: {
    Authorization: token
  }
});