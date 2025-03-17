import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDoODCyAkHHAG6wmk2OVx_IWljPk6Om0QU",
  authDomain: "movie-dashboard-9f6b3.firebaseapp.com",
  projectId: "movie-dashboard-9f6b3",
  storageBucket: "movie-dashboard-9f6b3.firebasestorage.app",
  messagingSenderId: "263409881892",
  appId: "1:263409881892:web:1b767875b74e235b8719b1",
  measurementId: "G-2LTSF460SB"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
