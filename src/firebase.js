//---------------------------------------------------------------------------------------------------------------
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAv-WyCV2fB9PaG8_yMpS7sSNarpDCe5tU",
  authDomain: "vidgro--clone.firebaseapp.com",
  projectId: "vidgro--clone",
  storageBucket: "vidgro--clone.appspot.com",
  messagingSenderId: "117194065794",
  appId: "1:117194065794:web:cc30a651b21f0c1524719b",
  measurementId: "G-C529T6TCMN",
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = getAuth(app);
export { auth };
