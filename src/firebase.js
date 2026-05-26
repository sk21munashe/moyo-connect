// src/firebase.js
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from 'firebase/auth';

// TODO: Replace this with your actual Firebase config
// Go to https://console.firebase.google.com -> Project Settings -> Your apps
const firebaseConfig = {
  apiKey: "AIzaSyCnktaOj_Ebo1UrHhfp8KsDoXtoBXgyKlI",
  authDomain: "moyo-connect.firebaseapp.com",
  projectId: "moyo-connect",
  storageBucket: "moyo-connect.firebasestorage.app",
  messagingSenderId: "541698991426",
  appId: "1:541698991426:web:707ae585af3a66019cd4db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export all the auth functions we need
export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { auth };