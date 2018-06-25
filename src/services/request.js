import store from '../store/store';
import { getAccount } from '../components/auth/reducers';

let token = '';

const key = 'account';
const storage = window.localStorage;

store.subscribe(() => {
  const account = getAccount(store.getState());
  const latestToken = account ? (account.token || '') : '';
  if(latestToken === token) return;

  token = latestToken;
  token ? storage.setItem(key, JSON.stringify(account)) : clearStoredAccount();
});

export const clearStoredAccount = () => storage.removeItem(key);

export const getStoredAccount = () => {
  const json = storage.getItem(key);
  try {
    return JSON.parse(json);
  }
  catch(err) {
    clearStoredAccount();
  }
};

function request(url, options = {}, data) {
  if(data) options.body = JSON.stringify(data);

  if(token) {
    if(!options.headers) options.headers = {};
    options.headers.Authorization = token;
  }

  return fetch(url, options)
    .then(response => [response.ok, response.json()])
    .then(([ok, json]) => {
      if(ok) return json;
      throw json.message || json.error || json.errors || json;
    });

}

const headers = {
  'content-type': 'application/json'
};

export const get = (url, options = {}) => request(url, { method: 'GET', ...options });
export const post = (url, data) => request(url, { method: 'POST', headers }, data);
export const put = (url, data) => request(url, { method: 'PUT', headers }, data);
export const del = (url, data) => request(url, { method: 'DELETE' }, data);

