const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://humanapp-sentinailes.firebaseio.com'
});

const handleFirebaseAuthUserCreation = require('./auth/user-creation');

exports.onUserCreation = functions.auth.user().onCreate(handleFirebaseAuthUserCreation);
