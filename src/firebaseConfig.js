import firebase from 'firebase';
import 'firebase/firestore';

/* ===============================================================
 *                     Firebase Initialization
  =============================================================== */

// Firebase initialization
const firebaseConfig = {
  apiKey: 'AIzaSyABC3SzD13n_7mva6LU8qshKrWtLmqDjW0',
  authDomain: 'humanapp-sentinailes.firebaseapp.com',
  databaseURL: 'https://humanapp-sentinailes.firebaseio.com',
  projectId: 'humanapp-sentinailes',
  storageBucket: 'humanapp-sentinailes.appspot.com',
  messagingSenderId: '371829755039',
  appId: '1:371829755039:web:f3492b1a29173599d5a6aa',
  measurementId: 'G-T9STF36JZ0',
};
firebase.initializeApp(firebaseConfig);

/**
 * Shorthand to access the Firestore Database
 */
const db = firebase.firestore();

/**
 * Shorthand to access the Firebase Auth service
 */
const auth = firebase.auth();

/**
 * Shorthand to the current user
 */
const { currentUser } = auth;


const dbSettings = {
  timestampsInSnapshots: true,
};
db.settings(dbSettings);

/* ===============================================================
 *                     Firestore Collections
  =============================================================== */

const usersCollection = db.collection('users');

export {
  db,
  auth,
  currentUser,
  usersCollection,
};
