import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBMrworHqJhAiKwMn6yjWHqFaSoUuF8W1w",
  authDomain: "crud-app-55234.firebaseapp.com",
  projectId: "crud-app-55234",
  storageBucket: "crud-app-55234.appspot.com",
  messagingSenderId: "429636054950",
  appId: "1:429636054950:web:4f1f3e927cb870f4d8e967",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
