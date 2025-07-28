'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, type User } from '@/lib/auth-actions';
import { ClientStorage } from '@/lib/client-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      ClientStorage.setUser(currentUser);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      ClientStorage.clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedUser = ClientStorage.getUser();
    if (cachedUser) {
      setUser(cachedUser);
      setLoading(false);
    }

    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
