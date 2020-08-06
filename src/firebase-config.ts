import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBh-m594R5klVcpc6CGc3KuTBpCP52QnZw',
  authDomain: 'focus-b7c03.firebaseapp.com',
  databaseURL: 'https://focus-b7c03.firebaseio.com',
  projectId: 'focus-b7c03',
  storageBucket: 'focus-b7c03.appspot.com',
  messagingSenderId: '424633475443',
  appId: '1:424633475443:web:cc6f71c949d0e3b8ba6506',
  measurementId: 'G-8K07N0JCCF',
};

firebase.initializeApp(firebaseConfig);
firebase.auth().signInAnonymously();
export const analytics = firebase.analytics();
export const storage = firebase.storage().ref();
export const db = firebase.firestore();
