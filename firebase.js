import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAcXeU0fIiJJszXR15vxJax7fPUlyg_QQA",
  authDomain: "pantry-tracker-c3d0e.firebaseapp.com",
  projectId: "pantry-tracker-c3d0e",
  storageBucket: "pantry-tracker-c3d0e.appspot.com",
  messagingSenderId: "749226696859",
  appId: "1:749226696859:web:88414468864ef32b2be63e",
  measurementId: "G-KE88EXH691"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { auth, db, storage };

