import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkNtGgXKtEHauTQrl6jahyXAxph7Dpqjs",
  authDomain: "opportunityhub-c0bd0.firebaseapp.com",
  projectId: "opportunityhub-c0bd0",
  storageBucket: "opportunityhub-c0bd0.firebasestorage.app",
  messagingSenderId: "304470115420",
  appId: "1:304470115420:web:1aca19cc027f0a6b499299",
  measurementId: "G-V6KKFTX30Y"
};

const isFirebaseConfigured = !!(
  "AIzaSyDkNtGgXKtEHauTQrl6jahyXAxph7Dpqjs" &&
  "opportunityhub-c0bd0.firebaseapp.com" &&
  "opportunityhub-c0bd0"
);

if (!isFirebaseConfigured && typeof window !== 'undefined') {
  console.warn(
    'Firebase environment variables are missing. OpportunityHub is running in local-first mock mode.'
  );
}

const app = isFirebaseConfigured
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : null;

export const auth = app ? getAuth(app) : null;

export const isFirebaseReal = () => {
  return isFirebaseConfigured && auth !== null;
};
