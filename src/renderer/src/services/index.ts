// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


//projeto teste
// const firebaseConfig = {
//   apiKey: 'AIzaSyBCvN5puQxzBmsisKFjvtPPks8-wlfqhsE',
//   authDomain: 'casa-dos-pisos-14eff.firebaseapp.com',
//   projectId: 'casa-dos-pisos-14eff',
//   storageBucket: 'casa-dos-pisos-14eff.appspot.com',
//   messagingSenderId: '708090181190',
//   appId: '1:708090181190:web:b1128286e36f62ba383c47'
// }

// projeto original
const firebaseConfig = {
  apiKey: 'AIzaSyAIO49nWtU3XWwdeVU4K-XauNylvEncm0U',
  authDomain: 'casa-dos-pisos-6913f.firebaseapp.com',
  projectId: 'casa-dos-pisos-6913f',
  storageBucket: 'casa-dos-pisos-6913f.appspot.com',
  messagingSenderId: '1054330376618',
  appId: '1:1054330376618:web:9da2919a1709c13bab5bd3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }
