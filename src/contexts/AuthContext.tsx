// src/contexts/AuthContext.tsx
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  // NEW:
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
      setLoading(false);
    });
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      loading,
      signInWithGoogle: async () => {
        await signInWithPopup(auth, googleProvider);
      },
      logOut: async () => {
        await signOut(auth);
      },
      signInWithEmail: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      signUpWithEmail: async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
          await updateProfile(cred.user, { displayName });
        }
      },
      resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
      },
    }),
    [user, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
