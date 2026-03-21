"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo mode - when Firebase is not configured, use mock auth
const isDemoMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemoMode) {
      // In demo mode, auto-login with a mock user
      setUser({
        uid: "demo-user",
        email: "demo@applymate.ai",
        displayName: "Demo User",
      } as User);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth!, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    if (isDemoMode) {
      setUser({ uid: "demo-user", email, displayName: "Demo User" } as User);
      return;
    }
    await signInWithEmailAndPassword(auth!, email, password);
  };

  const signUp = async (email: string, password: string) => {
    if (isDemoMode) {
      setUser({ uid: "demo-user", email, displayName: "Demo User" } as User);
      return;
    }
    await createUserWithEmailAndPassword(auth!, email, password);
  };

  const signInWithGoogle = async () => {
    if (isDemoMode) {
      setUser({
        uid: "demo-user",
        email: "demo@applymate.ai",
        displayName: "Demo User",
      } as User);
      return;
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth!, provider);
  };

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null);
      return;
    }
    await firebaseSignOut(auth!);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
