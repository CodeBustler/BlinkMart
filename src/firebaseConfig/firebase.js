import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// -----------------------------------------------------------
// ****************** FIREBASE CONFIG ******************
// -----------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDqYxXweVaaBQhug3w81Wk6NirkvyaxVPs",
  authDomain: "blinkmart-ecommerce-project.firebaseapp.com",
  projectId: "blinkmart-ecommerce-project",
  storageBucket: "blinkmart-ecommerce-project.appspot.com",
  messagingSenderId: "11284754473",
  appId: "1:11284754473:web:405d5b939c6d5374a1ac38",
  measurementId: "G-HZLGQDEQNN",
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// FOR STORING DATA
const fireDB = getFirestore(app);

// FOR AUTHENTICATION
const auth = getAuth(app);
export { fireDB, auth };
