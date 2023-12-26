// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApXUh-8iqO08ivpSBsrcRkNCNZEExKJeA",
  authDomain: "realvedic-beta-v1.firebaseapp.com",
  projectId: "realvedic-beta-v1",
  storageBucket: "realvedic-beta-v1.appspot.com",
  messagingSenderId: "785634242367",
  appId: "1:785634242367:web:576398fed556c5003f6d8a",
  measurementId: "G-0DTRSKL9EP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);