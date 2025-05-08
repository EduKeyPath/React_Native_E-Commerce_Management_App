import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let Auth        = false;
firebase.initializeApp({
  apiKey: '',
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});
firebase.firestore();

export default firebase;