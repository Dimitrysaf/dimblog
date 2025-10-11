// src/lib/AuthContext.tsx
'use client'; // Είναι σημαντικό να παραμείνει client component

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthError, Session } from '@supabase/supabase-js';
// ΔΙΟΡΘΩΣΗ: Άλλαξε την πηγή του import για το Supabase client
import { createClient } from '../utils/supabase/client';

// Δημιουργούμε ένα client instance που θα χρησιμοποιείται μόνο σε αυτό το context
const supabase = createClient();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ data: { user: User | null; session: Session | null }; error: AuthError | null }>;
  signOut: () => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ data: { user: null, session: null }, error: null }),
  signOut: async () => {},
  isLoggedIn: false,
});

// Hook to use auth anywhere in your app
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Login function
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  };

  // Logout function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value: AuthContextType = {
    user,           // The logged in user (or null)
    loading,        // Is it checking login status?
    signIn,         // Function to login
    signOut,        // Function to logout
    isLoggedIn: !!user  // Simple true/false
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};