import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB9gVqawrBsMQDzHX0YXCmz_1ZvIFGEfpo",
  authDomain: "jobsearch-e0946.firebaseapp.com",
  projectId: "jobsearch-e0946",
  storageBucket: "jobsearch-e0946.appspot.com",
  messagingSenderId: "642528194388",
  appId: "1:642528194388:web:7a2ee9fcbbaf6f072622c1",
  measurementId: "G-WK7J5KK0T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export{app,auth};