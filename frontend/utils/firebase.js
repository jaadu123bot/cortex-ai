// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: "cortex-ai-cd188.firebaseapp.com",
  projectId: "cortex-ai-cd188",
  storageBucket: "cortex-ai-cd188.firebasestorage.app",
  messagingSenderId: "916971347952",
  appId: "1:916971347952:web:8698960e4a2a85e4430735"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider()