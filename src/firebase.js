/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/functions';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firebaseApp = firebase;
const firestoreAuth = firebase.auth();
const firebaseStorage = firebase.storage();
const firebaseFunctions = firebase.functions();

const SingIn = ({ user, password }) =>
  firestoreAuth.signInWithEmailAndPassword(user, password);

const SingOut = async () => {
  firestoreAuth.signOut();
};

const GetCurrentSession = () => !!firestoreAuth.currentUser;

export {
  SingIn,
  SingOut,
  firebaseApp,
  firestoreAuth,
  firebaseStorage,
  GetCurrentSession,
  firebaseFunctions
};
