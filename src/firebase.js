import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSSpq3yKnZBz-77pgJKOrx8dvLXu1zFUg",
  authDomain: "hospital-form-95814.firebaseapp.com",
  projectId: "hospital-form-95814",
  storageBucket: "hospital-form-95814.firebasestorage.app",
  messagingSenderId: "618947705318",
  appId: "1:618947705318:web:f86875431dd1c725153e27"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);