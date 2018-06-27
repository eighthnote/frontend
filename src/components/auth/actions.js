import { ACCOUNT_AUTH, LOGOUT, AUTH_CHECKED } from './reducers';

import { postSignup, postSignin, getUserVerified } from '../../services/api';
import { getStoredAccount, clearStoredAccount } from '../../services/request';

const makeAuth = api => {
  return credentials => ({
    type: ACCOUNT_AUTH,
    payload: api(credentials)
  });
};

export const signup = makeAuth(postSignup);
export const signin = makeAuth(postSignin);

export const logout = () => ({ type: LOGOUT });

const authChecked = () => ({ type: AUTH_CHECKED });

export const attemptUserLoad = () => {
  return dispatch => {
    const token = getStoredAccount();
    if(!token) {
      return dispatch(authChecked());
    }

    return getUserVerified(token)
      .then(user => dispatch({
        type: ACCOUNT_AUTH,
        payload: { user, token }
      }))
      .catch(() => {
        clearStoredAccount();
      })
      .then(() => {
        dispatch(authChecked());
      });
  };
};