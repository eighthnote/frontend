export const ACCOUNT_AUTH = 'ACCOUNT_AUTH';
export const AUTH_CHECKED = 'AUTH_CHECKED';
export const LOGOUT = 'LOGOUT';

export const getAccount = state => state.account;
export const getCheckedAuth = state => state.checkedAuth;

export function account(state = null, { type, payload }) {
  switch(type) {
    case ACCOUNT_AUTH:
      return payload;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export function checkedAuth(state = false, { type }) {
  switch(type) {
    case AUTH_CHECKED:
      return true;
    default:
      return state;
  }
}