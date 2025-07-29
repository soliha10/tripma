'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/lib/auth-actions';
import { ClientStorage } from '@/lib/client-storage';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      console.log('Fetching current user from /api/auth/current-user');
      const response = await fetch('/api/auth/current-user', { credentials: 'include' });
      if (response.ok) {
        const userData = await response.json();
        // Convert createdAt to Date object
        if (userData.createdAt) {
          userData.createdAt = new Date(userData.createdAt);
        }
        console.log('User data fetched:', userData);
        setUser(userData);
        ClientStorage.setUser(userData);
      } else {
        console.error('Failed to fetch user:', response.status, response.statusText);
        setUser(null);
        ClientStorage.clearUser();
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      ClientStorage.clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
