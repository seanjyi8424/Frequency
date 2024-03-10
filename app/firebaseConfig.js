import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZPtNrwxU5plviOh-E-o6ajpCCV3EO-gg",
  authDomain: "frequency-1709785965876.firebaseapp.com",
  databaseURL: "https://frequency-1709785965876-default-rtdb.firebaseio.com",
  projectId: "frequency-1709785965876",
  storageBucket: "frequency-1709785965876.appspot.com",
  messagingSenderId: "491029128292",
  appId: "1:491029128292:web:b4ab65bd1b66767cb7ab71",
  measurementId: "G-DB2DC142TY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
