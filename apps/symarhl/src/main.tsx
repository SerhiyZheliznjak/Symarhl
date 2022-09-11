import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './main.css';
import App from './app/components/App';
import * as serviceWorker from './app/serviceWorker';

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {home} from './app/store';

const reducer = combineReducers({
  home: home,
});

export type StoreType = ReturnType<typeof reducer>;

export const store = configureStore({
  reducer,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
