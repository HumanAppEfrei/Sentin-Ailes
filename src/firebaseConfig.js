import firebase from 'firebase';
import 'firebase/firestore';

/* ===============================================================
 *                     Firebase Initialization
  =============================================================== */

// Firebase initialization
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);

/**
 * Shorthand to access the Firestore Database
 */
const db = firebase.firestore();

// Support for Firestore-specific data types
const { Timestamp } = firebase.firestore;

/**
 * Shorthand to access the Firebase Auth service
 */
const auth = firebase.auth();

/**
 * Shorthand to the current user
 */
const { currentUser } = auth;

/* ===============================================================
 *                     Firestore Collections
  =============================================================== */

const usersCollection = db.collection('users');
const whitelistCollection = db.collection('whitelist');

/**
 * Get a a reference to the notes subcollection of a user
 * @param {String} userId UID of the Beneficiaire to gather the notes of
 * @returns {CollectionReference} Reference to the notes subcollection of the user
 */
function getUserNotesSubcollection(userId) {
  return usersCollection.doc(userId).collection('notes');
}

const { analytics } = firebase;

const { FieldValue } = firebase.firestore;

export {
  Timestamp,
  FieldValue,
  analytics,
  db,
  auth,
  currentUser,
  getUserNotesSubcollection,
  usersCollection,
  whitelistCollection,
};
