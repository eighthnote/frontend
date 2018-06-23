import store from '../store/store';
import { getToken } from '../components/auth/reducers';

let token = '';

const key = 'token';
const storage = window.localStorage;

store.subscribe(() => {
  const latestToken = getToken(store.getState()) || '';
  if(latestToken === token) return;

  token = latestToken;
  token ? storage.setItem(key, JSON.stringify(token)) : clearStoredToken();
});

export const clearStoredToken = () => storage.removeItem(key);

export const getStoredToken = () => {
  const json = storage.getItem(key);
  try {
    return JSON.parse(json);
  }
  catch(err) {
    clearStoredToken();
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