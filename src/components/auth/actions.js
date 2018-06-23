import { USER_AUTH } from './reducers';

import { postSignup, postSignin } from '../../services/api';

const makeAuth = api => {
  return credentials => ({
    type: USER_AUTH,
    payload: api(credentials)
  });
};

export const signup = makeAuth(postSignup);
export const signin = makeAuth(postSignin);