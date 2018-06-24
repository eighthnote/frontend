import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from './components/app/App';
import store from './store/store';
import './main.css';

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);