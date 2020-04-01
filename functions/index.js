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
  userCollection.doc(uid).set({ type }, { merge: true });
};

exports.onUserCreation = functions.auth.user().onCreate(async user => {
  console.log("Processing user data with email:", user.email);

  // Check whether or not the user's email address is registered in the whitelist
  const userWhitelistRecord = await getUserWhitelistRecord(user.email);
  if (userWhitelistRecord === null) {
    console.log("Unable to find whitelist record with provided email, deleting user...");

    // If email not in the whitelist, delete the newly created user record for Auth service and associated Firestore record
    admin.auth().deleteUser(user.uid);
    setTimeout(() => userCollection.doc(user.uid).delete(), 15000);
    return;
  }


  // Create Firestore record in 'users' collection with matching UID
  if (
    ['beneficiaire', 'intervenant', 'admin', 'superAdmin'].indexOf(
      userWhitelistRecord.data().userType
    ) !== -1
  ) {
    createUserFirestoreRecord(user.uid, userWhitelistRecord.data().userType);
  } else {
    console.log("Unable to find valid userType value for whitelist record, deleting user...");
    // If whitelist record is invalid, delete the newly created user
    admin.auth().deleteUser(user.uid);
    return;
  }

  // Delete record from 'whitelist' collection
  console.log("User created, removing whitelist record with provided email");
  whitelist.doc(userWhitelistRecord.id).delete();
});
