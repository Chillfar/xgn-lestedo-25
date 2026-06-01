import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_RCBVTo6yW5LatnF2ir52Qv-UslS2h_Y",
  authDomain: "xgn-lestedo.firebaseapp.com",
  projectId: "xgn-lestedo",
  storageBucket: "xgn-lestedo.firebasestorage.app",
  messagingSenderId: "931884269837",
  appId: "1:931884269837:web:9af89a6e0954e0f5077044"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
