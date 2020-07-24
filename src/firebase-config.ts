import * as firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDPUrgV-AXd6UsZNcRZ5-C4lHJK8awmwpM",
  authDomain: "bh-automoveis-f0392.firebaseapp.com",
  databaseURL: "https://bh-automoveis-f0392.firebaseio.com",
  projectId: "bh-automoveis-f0392",
  storageBucket: "bh-automoveis-f0392.appspot.com",
  messagingSenderId: "838908412779",
  appId: "1:838908412779:web:a07644edde9d6150f2022e",
  measurementId: "G-56Z07D0XBJ",
};

firebase.initializeApp(firebaseConfig);
export const analytics = firebase.analytics();
export const storage = firebase.storage().ref();
export const db = firebase.firestore();
