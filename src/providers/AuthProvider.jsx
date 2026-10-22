"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as updateFirebaseProfile,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

const AuthContext = createContext(null);

const ERROR_MESSAGES = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/email-already-in-use": "An account with this email already exists. Try logging in.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/popup-closed-by-user": "Google sign-in was closed before it finished.",
  "auth/cancelled-popup-request": "Google sign-in was cancelled.",
  "auth/popup-blocked": "Your browser blocked the Google sign-in popup. Allow popups and try again.",
  "auth/operation-not-allowed": "This sign-in method is not enabled in the Firebase console.",
  "auth/unauthorized-domain": "This domain is not authorised in the Firebase console.",
};

export function authErrorMessage(error) {
  return ERROR_MESSAGES[error?.code] || error?.message || "Something went wrong. Please try again.";
}

function requireAuth() {
  if (!auth) {
    throw new Error("Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to .env.");
  }
  return auth;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  // The Firebase user object is mutated in place on profile changes; bump to re-render consumers.
  const [profileVersion, setProfileVersion] = useState(0);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
  }, []);

  const login = useCallback(
    (email, password) => signInWithEmailAndPassword(requireAuth(), email, password),
    []
  );

  const register = useCallback(async (name, email, password, photoURL) => {
    const credential = await createUserWithEmailAndPassword(requireAuth(), email, password);
    await updateFirebaseProfile(credential.user, { displayName: name, ...(photoURL ? { photoURL } : {}) });
    // Refresh so the ID token sent to the API already carries the display name and photo.
    await credential.user.getIdToken(true);
    setUser(credential.user);
    setProfileVersion((v) => v + 1);
    return credential;
  }, []);

  const googleLogin = useCallback(
    () => signInWithPopup(requireAuth(), new GoogleAuthProvider()),
    []
  );

  const logout = useCallback(() => signOut(requireAuth()), []);

  const updateProfile = useCallback(async (profile) => {
    const current = requireAuth().currentUser;
    await updateFirebaseProfile(current, profile);
    await current.getIdToken(true);
    setProfileVersion((v) => v + 1);
  }, []);

  const value = useMemo(
    () => ({ user, profileVersion, loading, login, register, googleLogin, logout, updateProfile }),
    [user, profileVersion, loading, login, register, googleLogin, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
