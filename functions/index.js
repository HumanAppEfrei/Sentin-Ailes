const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://humanapp-sentinailes.firebaseio.com'
});

const whitelist = admin.firestore().collection('whitelist');
const userCollection = admin.firestore().collection('users');

const getUserWhitelistRecord = async email => {
  const records = await whitelist
    .where('email', '==', email)
    .limit(1) // No need for multiple records
    .get();

  if (records.empty) {
    return null;
  } else {
    return records.docs[0];
  }
};

const createUserFirestoreRecord = (uid, type) => {
  userCollection.doc(uid).set({ type });
};

exports.onUserCreation = functions.auth.user().onCreate(async user => {
  // Check whether or not the user's email address is registered in the whitelist
  const userWhitelistRecord = await getUserWhitelistRecord(user.email);
  if (userWhitelistRecord === null) {
    // If email not in the whitelist, delete the newly created user record
    admin.auth().deleteUser(user.uid);
    return;
  }

  // Create Firestore record in 'users' collection with matching UID
  if (
    ['beneficiaire', 'intervenant', 'admin', 'superAdmin'].indexOf(
      userWhitelistRecord.data.userType
    ) !== -1
  ) {
    createUserFirestoreRecord(user.uid, userWhitelistRecord.data.userType);
  } else {
    // If whitelist record is invalid, delete the newly created user
    admin.auth().deleteUser(user.uid);
    return;
  }

  // Delete record from 'whitelist' collection
  whitelist.doc(userWhitelistRecord.id).delete();
});
