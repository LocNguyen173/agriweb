const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "agriweb-b3d1f.firebasestorage.app" // Bỏ gs:// prefix
  });
} 

const db = admin.firestore();
const storage = admin.storage().bucket();

module.exports = { admin, db, storage };