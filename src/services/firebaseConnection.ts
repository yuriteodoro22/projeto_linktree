import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmGaaPkhsBOBvUZ0LPUViSiHFvYw0cE7c",
  authDomain: "reactlinks-ac6f7.firebaseapp.com",
  projectId: "reactlinks-ac6f7",
  storageBucket: "reactlinks-ac6f7.appspot.com",
  messagingSenderId: "697853283363",
  appId: "1:697853283363:web:c642aa6141b22c55277596"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth , db};