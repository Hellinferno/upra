// --- FIREBASE CONFIGURATION ---
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBIKIbQvBUNOGHY3qO-pS7Y6i6KT4JDw6U",
    authDomain: "upra-filings.firebaseapp.com",
    projectId: "upra-filings",
    storageBucket: "upra-filings.firebasestorage.app",
    messagingSenderId: "628753511218",
    appId: "1:628753511218:web:5fe5825d1a058537815d2b",
    measurementId: "G-E87FQ7KHQ2"
};

let app;
let analytics;
let auth;

try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    auth = getAuth(app);
} catch (error) {
    console.log("Firebase initialization error or already initialized", error);
}

export { app, analytics, auth };
