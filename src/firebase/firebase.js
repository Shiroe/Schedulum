import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdZ2ccGmcOQG_KAnIkCYreTAXaJVXiyNw",
  authDomain: "schedulum.firebaseapp.com",
  databaseURL: "https://schedulum.firebaseio.com",
  projectId: "schedulum",
  storageBucket: "schedulum.appspot.com",
  messagingSenderId: "761621820472",
  appId: "1:761621820472:web:aa06191a0629c69eace2cd",
  measurementId: "G-M85SYEZBLG"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
