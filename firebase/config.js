// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB-vJ2hpLrgXpVhuBgtQ-YAmvlbtf7TxtA",
    authDomain: "react-native-389314.firebaseapp.com",
    databaseURL:
        "https://react-native-389314-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-native-389314",
    storageBucket: "react-native-389314.appspot.com",
    messagingSenderId: "174149948153",
    appId: "1:174149948153:web:ff2ff8e88c4a0b1a2f8828",
    measurementId: "G-7SRPKFRJ1J",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
