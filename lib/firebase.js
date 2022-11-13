import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

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

// Se checa si ya hay una app de firebae y si no se inicia
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Se exportan los métodos necesarios para la autenticación con firebase
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

// Se exportan los métodos necesarios para usar la base de datos de firebase
export const firestore = firebase.firestore();
export const storage = firebase.storage();

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

// Se convierte el doc de firebase a JSON para poder usarlo
export function docToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
  };
}
