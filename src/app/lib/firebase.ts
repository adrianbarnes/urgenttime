import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Type definitions for your Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
  // Add other Firebase configuration properties as needed
}

const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY as string,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,    
    appId: process.env.FIREBASE_APP_ID as string,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//export const auth = firebase.auth();
export const firestore = firebase.firestore();
