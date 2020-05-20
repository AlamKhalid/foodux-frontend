import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyClvq6XNB44sghz6jQsQlDxkRnQF_nYKBs",
  authDomain: "foodux-71133.firebaseapp.com",
  databaseURL: "https://foodux-71133.firebaseio.com",
  projectId: "foodux-71133",
  storageBucket: "foodux-71133.appspot.com",
  messagingSenderId: "591011548398",
  appId: "1:591011548398:web:40e52b68796402920177ff",
  measurementId: "G-L3773HRK78",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
