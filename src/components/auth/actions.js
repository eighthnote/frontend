import { ACCOUNT_AUTH, LOGOUT, AUTH_CHECKED } from './reducers';

import { postSignup, postSignin, getAccountVerified } from '../../services/api';
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

export const attemptAccountLoad = () => {
  return dispatch => {
    const account = getStoredAccount();
    if(!account || !account.token) {
      return dispatch(authChecked());
    }

    return getAccountVerified(account.token)
      .then(() => dispatch({
        type: ACCOUNT_AUTH,
        payload: account
      }))
      .catch(() => {
        clearStoredAccount();
      })
      .then(() => {
        dispatch(authChecked());
      });
  };
};