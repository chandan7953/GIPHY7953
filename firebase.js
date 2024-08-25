import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfUku6cdKM9664UpOnbUfg4bYiutGLFak",
  authDomain: "personalgiphy.firebaseapp.com",
  projectId: "personalgiphy",
  storageBucket: "personalgiphy.appspot.com",
  messagingSenderId: "183014152354",
  appId: "1:183014152354:web:d492d916ad33cdd9005ffb",
  measurementId: "G-3M0TWTZCRW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
