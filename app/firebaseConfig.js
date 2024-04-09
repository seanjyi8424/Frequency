import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAkd5P0LLL5uju_ESjU-Hsmfj0GsPApUjs",
  authDomain: "frequency-ucr.firebaseapp.com",
  databaseURL: "https://frequency-ucr-default-rtdb.firebaseio.com",
  projectId: "frequency-ucr",
  storageBucket: "frequency-ucr.appspot.com",
  messagingSenderId: "751412752357",
  appId: "1:751412752357:web:078d718b491dbcd2d0490c",
  measurementId: "G-7Z2TJD0RB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { auth, database };
