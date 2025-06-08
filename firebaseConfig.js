import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "MINHAAPIAQUI", 
  authDomain: "MINHAAPIAQUI", 
  projectId: "MINHAAPIAQUI", 
  storageBucket: "MINHAAPIAQUI", 
  messagingSenderId: "MINHAAPIAQUI", 
  appId: "MINHAAPIAQUI", 
  measurementId: "MINHAAPIAQUI" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

