
import { initializeApp } from "firebase/app";
import { getAuth }       from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBuJkK1nDhDk--fsGBbKPjd3637LED_E1A",
    authDomain: "beautifulcolorslaundry-ecd80.firebaseapp.com",
    projectId: "beautifulcolorslaundry-ecd80",
    storageBucket: "beautifulcolorslaundry-ecd80.appspot.com",
    messagingSenderId: "455107206068",
    appId: "1:455107206068:web:47d0db1774c8b4c9bcf0e1"
};



const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};