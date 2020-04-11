const admin = require('firebase-admin');

const whitelist = admin.firestore().collection('whitelist');

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

module.exports = {
  getUserWhitelistRecord
};
