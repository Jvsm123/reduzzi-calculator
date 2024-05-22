// import { initializeApp } from "firebase";
// import { auth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: VITE_FIREBASE_API_KEY,
//   authDomain: VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: VITE_FIREBASE_PROJECT_ID,
//   storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: VITE_FIREBASE_APP_ID,
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const authFirebase = auth();

// export {firebase, authFirebase, firebaseApp};

import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export { firebase, auth };