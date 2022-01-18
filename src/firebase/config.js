import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCYewOqT3ABXXtP9ERbmu7_x8YmrSzhi6c",
  authDomain: "moneytracker-d3a90.firebaseapp.com",
  projectId: "moneytracker-d3a90",
  storageBucket: "moneytracker-d3a90.appspot.com",
  messagingSenderId: "145922396776",
  appId: "1:145922396776:web:437cd08ccc9bd1cd2421dd"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };