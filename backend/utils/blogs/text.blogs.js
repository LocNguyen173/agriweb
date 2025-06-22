import { db } from "../../config/firebaseConfig.js";

// Lưu văn bản blog lên Firestore
async function saveBlogTextToFirebase(blogId, text) {
  const docRef = db.collection("blogs").doc(blogId);
  await docRef.set({ text });

  // Tạo URL dẫn tới document trên Firebase Console
  const projectId = db._settings.projectId || "agriweb-b3d1f";
  const url = `https://console.firebase.google.com/project/${projectId}/firestore/data/~2Fblogs~2F${blogId}`;
  return url;
}

// Lấy văn bản blog từ Firestore
async function getBlogTextFromFirebase(blogId) {
  const docRef = db.collection("blogs").doc(blogId);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
    return docSnap.data().text;
  } else {
    throw new Error("Blog not found");
  }
}

async function deleteBlogTextFromFirebase(blogId) {
  const docRef = db.collection("blogs").doc(blogId);
  await docRef.delete();
  return true;
}

export {
  saveBlogTextToFirebase,
  getBlogTextFromFirebase,
  deleteBlogTextFromFirebase
};