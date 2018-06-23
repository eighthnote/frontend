import { get, post } from './request';

const URL = '/api';
const USERS_URL = `${URL}/users`;
const FRIENDS_URL = `${URL}/friends`;
const AUTH_URL = `${URL}/auth`;

export const getUser = id => get(`${USERS_URL}/${id}`);
export const getFriends = () => get(FRIENDS_URL);

export const postSignin = credentials => post(`${AUTH_URL}/signin`, credentials);
export const postSignup = credentials => post(`${AUTH_URL}/signup`, credentials);
export const getUserVerified = token => get(`${AUTH_URL}/verify`, {
  headers: {
    headers: {
      Authorization: token
    }
  }
});