import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyCdr3-2eNprvsUUo6Vmk6jjZDYrpOMbMiU", 
  authDomain: "lolstats-8921d.firebaseapp.com", 
  projectId: "lolstats-8921d", 
  storageBucket: "lolstats-8921d.firebasestorage.app", 
  messagingSenderId: "1056193214215", 
  appId: "1:1056193214215:web:55c89ad6bacb77106077a2", 
  measurementId: "G-0V10HNTL4D" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };