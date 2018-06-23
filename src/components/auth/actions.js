import { USER_AUTH, LOGOUT } from './reducers';

import { postSignup, postSignin } from '../../services/api';

const makeAuth = api => {
  return credentials => ({
    type: USER_AUTH,
    payload: api(credentials)
  });
};

export const signup = makeAuth(postSignup);
export const signin = makeAuth(postSignin);

export const logout = () => ({ type: LOGOUT });