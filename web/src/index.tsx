import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import firebase from 'firebase';
import ReactGA from 'react-ga';

const firebaseConfig = {
  apiKey: 'AIzaSyCkLooDRFAalkw0uqTgrRyiV7d8EndB8ts',
  authDomain: 'maboroshijima-8ce9a.firebaseapp.com',
  databaseURL: 'https://maboroshijima-8ce9a.firebaseio.com',
  projectId: 'maboroshijima-8ce9a',
  storageBucket: 'maboroshijima-8ce9a.appspot.com',
  messagingSenderId: '25088715986',
  appId: '1:25088715986:web:0481076f0a6b819c',
};
firebase.initializeApp(firebaseConfig);

ReactGA.initialize('UA-146366266-1', {
  gaOptions: {siteSpeedSampleRate: 100},
});

ReactDOM.render(<App />, document.getElementById('root'));
