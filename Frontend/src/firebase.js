import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCyZYjH8Q_4PUapdAm-oP9EE9NNaSZTRdQ",
  authDomain: "capacity-connect-codecrushers.firebaseapp.com",
  projectId: "capacity-connect-codecrushers",
  storageBucket: "capacity-connect-codecrushers.firebasestorage.app",
  messagingSenderId: "944077619351",
  appId: "1:944077619351:web:f1a483076896c29e23a9d2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();