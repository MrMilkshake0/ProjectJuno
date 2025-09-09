// src/lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously, type Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);

// Ensure we have an authenticated user (anonymous is fine for now)
export const authReady: Promise<void> = new Promise((resolve, reject) => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    try {
      if (!user) await signInAnonymously(auth);
      resolve();
    } catch (e) {
      reject(e);
    } finally {
      unsub();
    }
  });
});
