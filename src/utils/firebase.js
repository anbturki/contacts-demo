import  firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "AIzaSyByB3Y3BRPDr8y_fHlqwzSdXyYMWXeXEJY",
  authDomain: "",
  databaseURL: "https://contacts-651b9-default-rtdb.firebaseio.com/",
  projectId: "contacts-651b9",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("users");
const contactsCollection = db.collection("contacts");

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  contactsCollection
};
