import { initializeApp } from "firebase/app";
import { getDatabase, ref,get, child, push, query, orderByChild, equalTo } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyD1-oFV9QkbEVRgGNOW669SBeuSLTYzBfc",
    authDomain: "calendar-91c5c.firebaseapp.com",
    projectId: "calendar-91c5c",
    storageBucket: "calendar-91c5c.appspot.com",
    messagingSenderId: "671208282255",
    appId: "1:671208282255:web:38f7854d75d85c9117b8fa",
    measurementId: "G-K7T4YBXTR6"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push,get, child, query, orderByChild, equalTo };
