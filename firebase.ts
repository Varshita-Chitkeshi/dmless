import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHvyH7JdlOxc3rx-n--Oqu3GOzym7XkaQ",
  authDomain: "dmless-136d1.firebaseapp.com",
  projectId: "dmless-136d1",
  storageBucket: "dmless-136d1.firebasestorage.app",
  messagingSenderId: "362061472815",
  appId: "1:362061472815:web:3105f52d44312f08dc52da"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);