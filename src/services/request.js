import store from '../store/store';
import { getToken } from '../components/auth/reducers';

let token = '';

const key = 'token';
const storage = window.localStorage;

store.subscribe(() => {
  const latestToken = getToken(store.getState()) || '';
  if(latestToken === token) return;

  token = latestToken;
  token ? storage.setItem(key, token) : clearStoredToken();
});

export const clearStoredToken = () => storage.removeItem(key);

export const getStoredToken = () => {
  return storage.getItem(key);
};

function request(url, options = {}, data) {
  if(data) options.body = JSON.stringify(data);

  if(token) {
    if(!options.headers) options.headers = {};
    options.headers.Authorization = token;
  }

  // return fetch(url, options)
  //   .then(response => [response.ok, response.json()])
  //   .then(([ok, json]) => {
  //     if(ok) return json;
  //     throw json.message || json.error || json.errors || json;
  //   });

  const user = {
    _id: 'abc',
    firstName: 'Keli',
    lastName: 'Hansen',
    picture: 'https://scontent-sea1-1.cdninstagram.com/vp/8e2af0c76066ed7cc1fc7f0b001c285d/5BAEC34C/t51.2885-19/s150x150/12960106_547853175394452_1113775208_a.jpg',
    email: 'keli@keli.com',
    preferredContact: { type: 'text', details: '(555) 555-5555' },
    additionalContact: [],
    availability: 'most likely to want to go out on Friday evenings',
    friends: ['123', '456'],
    offering: [
      { _id: 1, description: 'knitting lessons', seenBy: ['123'] },
      { _id: 2, description: 'audiobook recommendations', seenBy: [] }
    ],
    wanting: [
      { _id: 1, description: 'gardening advice', seenBy: ['123', '456'], expires: new Date(2018, 6, 31) },
      { _id: 2, description: 'someone to get Indian food with', seenBy: [], once: true }
    ]
  };

  const others = [{
    _id: '123',
    firstName: 'Liz',
    lastName: 'M',
    picture: 'https://scontent-sea1-1.cdninstagram.com/vp/8e2af0c76066ed7cc1fc7f0b001c285d/5BAEC34C/t51.2885-19/s150x150/12960106_547853175394452_1113775208_a.jpg',
    email: 'liz@liz.com',
    preferredContact: { type: 'call', details: '(555) 555-5555' },
    additionalContact: [{ _id: 1, type: 'email', details: 'liz@mail.com' }],
    availability: 'Sunday afternoons are generally best',
    friends: ['abc', '456'],
    offering: [
      { _id: 1, description: 'trumpet serenades', seenBy: ['abc'] }
    ],
    wanting: [
      { _id: 1, description: 'people to come to my dance performance', seenBy: ['456'], expires: new Date(2018, 5, 30) },
      { _id: 2, description: 'a hug', seenBy: ['abc', '456'] }
    ]
  }, {
    _id: '456',
    firstName: 'Fran',
    lastName: 'C',
    picture: 'https://scontent-sea1-1.cdninstagram.com/vp/8e2af0c76066ed7cc1fc7f0b001c285d/5BAEC34C/t51.2885-19/s150x150/12960106_547853175394452_1113775208_a.jpg',
    email: 'fran@fran.com',
    preferredContact: { type: 'call', details: '(555) 555-5555' },
    additionalContact: [{ _id: 1, type: 'email', details: 'fran@mail.com' }],
    availability: 'I\'m getting over the flu - don\'t give up on me if I\'m too tired to go out!',
    friends: ['abc', '123', '456'],
    offering: [
      { _id: 1, description: 'postcards!', seenBy: ['abc', '123'] }
    ],
    wanting: [
      { _id: 1, description: 'someone to plan a backpacking trip with', seenBy: ['abc'], once: true, highPriority: true }
    ]
  }, {
    _id: '789',
    firstName: 'friend of fran',
    lastName: 'X',
    friends: ['456']
  }];

  switch(options.method) {
    case 'GET':
      if(url === '/api/friends') {
        const friends = others.filter(x => user.friends.includes(x._id));
        return Promise.resolve(friends);
      } else if(url === '/api/auth/verify' || url === 'api/users/abc') {
        return Promise.resolve(user);
      } else return Promise.resolve(others[1]);
    case 'POST':
      return Promise.resolve({ user, token });
  }
}

const headers = {
  'content-type': 'application/json'
};

export const get = (url, options = {}) => request(url, { method: 'GET', ...options });
export const post = (url, data) => request(url, { method: 'POST', headers }, data);
export const put = (url, data) => request(url, { method: 'PUT', headers }, data);
export const del = (url, data) => request(url, { method: 'DELETE' }, data);

