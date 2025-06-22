// filepath: d:\Workspaces\agriweb\backend\config\firebaseConfig.js
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccount = JSON.parse(fs.readFileSync(path.join(__dirname, "serviceAccountKey.json"), "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://agriweb-b3d1f.firebasestorage.app"
  });
}

const db = admin.firestore();
const storage = admin.storage().bucket();

export { admin, db, storage };