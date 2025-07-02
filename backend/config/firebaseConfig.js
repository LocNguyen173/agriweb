const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

let serviceAccount;

// Trong production, sử dụng environment variable
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // Trong development, sử dụng file
  serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8"));
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "agriweb-b3d1f.firebasestorage.app" // Bỏ gs:// prefix
  });
} 

const db = admin.firestore();
const storage = admin.storage().bucket();

module.exports = { admin, db, storage };