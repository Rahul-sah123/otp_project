// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcdGJzTalmSXQhCufaIUb0OvRP3ZQ5umw",
  authDomain: "otp-project-fd8fa.firebaseapp.com",
  projectId: "otp-project-fd8fa",
  storageBucket: "otp-project-fd8fa.appspot.com",
  messagingSenderId: "812947347400",
  appId: "1:812947347400:web:72d5897f95680ac8d952fd",
  measurementId: "G-YSQKLRRCP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)