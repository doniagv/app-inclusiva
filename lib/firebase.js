import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAedboDYNwe5MiGKv0qVqi7cp_CTR69_XE",
  authDomain: "apps-inclusivas.firebaseapp.com",
  projectId: "apps-inclusivas",
  storageBucket: "apps-inclusivas.appspot.com",
  messagingSenderId: "729212998190",
  appId: "1:729212998190:web:823cd0d775b4a5f8c905bf",
  measurementId: "G-ETC1BLY6FN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();