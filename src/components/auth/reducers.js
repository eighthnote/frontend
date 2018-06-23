export const USER_AUTH = 'USER_AUTH';
export const CHECKED_AUTH = 'CHECKED_AUTH';
export const LOGOUT = 'LOGOUT';

export const getUser = state => state.user;
export const getCheckedAuth = state => state.checkedAuth;

export function user(state = null, { type, payload }) {
  switch(type) {
    case USER_AUTH:
      return payload.user;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export function token(state = null, { type, payload }) {
  switch(type) {
    case USER_AUTH:
      return payload.token;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}

export function checkedAuth(state = false, { type }) {
  switch(type) {
    case CHECKED_AUTH:
      return true;
    default:
      return state;
  }
}