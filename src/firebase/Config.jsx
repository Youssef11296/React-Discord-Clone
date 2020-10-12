import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD1znaR8kAVEKib273dc6MLHiAhZqm-wx0",
  authDomain: "discord-clone-v.firebaseapp.com",
  databaseURL: "https://discord-clone-v.firebaseio.com",
  projectId: "discord-clone-v",
  storageBucket: "discord-clone-v.appspot.com",
  messagingSenderId: "309298976870",
  appId: "1:309298976870:web:59f468b0a23ab4a7a9b5a7",
  measurementId: "G-090GTKY9YJ",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
