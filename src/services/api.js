import { get, post, put, del } from './request';

const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const PROFILE_URL = `${URL}/profile`;

export const postSignin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const postSignup = credentials => post(`${AUTH_URL}/signup`, credentials);
export const getAccountVerified = token => get(`${AUTH_URL}/verify`, {
  headers: {
    Authorization: token
  }
});

export const getUserProfile = () => get(PROFILE_URL);
export const putProfile = data => put(PROFILE_URL, data);

export const postShareable = shareable => post(`${PROFILE_URL}/shareables`, shareable);
export const putShareable = (shareableId, data) => put(`${PROFILE_URL}/shareables/${shareableId}`, data);
export const deleteShareable = (shareableId) => del(`${PROFILE_URL}/shareables/${shareableId}`);

export const getFriends = () => get(`${PROFILE_URL}/friends`);
export const putFriends = email => put(`${PROFILE_URL}/friends/`, email);
export const putFriendsAccept = id => put(`${PROFILE_URL}/friends/confirm/${id}`);
export const getFriendProfile = friendId => get(`${PROFILE_URL}/friends/${friendId}`);
export const deleteFriend = id => del(`${PROFILE_URL}/friends/${id}`);

export const getFeed = () => get(`${PROFILE_URL}/feed`);