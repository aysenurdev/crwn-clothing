import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA5cJsiLko6ht45ng-wREVwPuAyyGawxZ4",
  authDomain: "crwn-clothing-db-7c702.firebaseapp.com",
  projectId: "crwn-clothing-db-7c702",
  storageBucket: "crwn-clothing-db-7c702.appspot.com",
  messagingSenderId: "344785018619",
  appId: "1:344785018619:web:6bb3f848e735e7bc179a5e"
};

// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, 
    googleProvider);

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, 
    googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);


     const userSnapshot = await getDoc (userDocRef)
    

     if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, ...additionalInformation});
        } catch (error) {
            console.log('error creating the user' , error.message);

        }
     }

     return userDocRef;

  };



  export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await  createUserWithEmailAndPassword(auth, email, password)
  };