import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './screens/App';
import * as serviceWorker from './serviceWorker';
import {
    initializeApp,
  } from 'firebase';
  
  const firebaseConfig = {
    apiKey: "AIzaSyCYrueBqeLbOyQhvVys9PkmW3k7Wj8_voo",
    authDomain: "askdesigner-c3e26.firebaseapp.com",
    databaseURL: "https://askdesigner-c3e26.firebaseio.com",
    projectId: "askdesigner-c3e26",
    storageBucket: "askdesigner-c3e26.appspot.com",
    messagingSenderId: "1073676023180",
    appId: "1:1073676023180:web:d5d48fde45839dcc3c92a9",
    measurementId: "G-XBCVPMR31J"
  };
  initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
