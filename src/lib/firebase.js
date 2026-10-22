import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let auth = null;

if (isFirebaseConfigured) {
  const app = getApps()[0] ?? initializeApp(config);
  auth = getAuth(app);

  // Local testing against the Firebase Auth emulator (e.g. "http://127.0.0.1:9099").
  const emulator = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_URL;
  if (emulator && !auth.emulatorConfig) {
    connectAuthEmulator(auth, emulator, { disableWarnings: true });
  }
}

export { auth };
