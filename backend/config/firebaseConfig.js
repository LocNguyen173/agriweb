// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKs8jLFGzlOt8fLbWjWgIFZpKFjMVT6jQ",
  authDomain: "agriweb-b3d1f.firebaseapp.com",
  projectId: "agriweb-b3d1f",
  storageBucket: "agriweb-b3d1f.appspot.com",
  messagingSenderId: "598190491714",
  appId: "1:598190491714:web:d83f4c49319779b3e6c5db",
  measurementId: "G-L0JC8GESY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };