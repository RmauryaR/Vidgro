// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase/app";

// import "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyAhcxbK0Lnszk60CnXrK-uZQikPAPB9Y1w",
//   authDomain: "my-rgm.firebaseapp.com",
//   projectId: "my-rgm",
//   storageBucket: "my-rgm.appspot.com",
//   messagingSenderId: "984230116746",
//   appId: "1:984230116746:web:4b741c0b8138d535e95c73",
//   measurementId: "G-QCSF9XJ3RY",
// };

// firebase.initializeApp(firebaseConfig);

// export default firebase.auth();

//---------------------------------------------------------------------------------------------------------------
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhe8PW7scTdBvHnoD_e6KgBv_JLeDzkDY",
  authDomain: "my-rgm.firebaseapp.com",
  projectId: "my-rgm",
  storageBucket: "my-rgm.appspot.com",
  messagingSenderId: "984230116746",
  appId: "1:984230116746:web:4b741c0b8138d535e95c73",
  measurementId: "G-QCSF9XJ3RY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
const auth = getAuth(app);
export { auth };
