'use client';

import { User } from './auth-actions';

interface StoredUser extends Omit<User, 'createdAt'> {
  createdAt: string;
}

export const ClientStorage = {
  setUser: (user: User | null) => {
    if (typeof window !== 'undefined') {
      try {
        if (user) {
          const userForStorage: StoredUser = {
            ...user,
            createdAt: user.createdAt.toISOString(),
          };
          localStorage.setItem('tripma_user', JSON.stringify(userForStorage));
        } else {
          localStorage.removeItem('tripma_user');
        }
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    }
  },

  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('tripma_user');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          return {
            ...parsed,
            createdAt: new Date(parsed.createdAt),
          };
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          localStorage.removeItem('tripma_user');
          return null;
        }
      }
    }
    return null;
  },

  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tripma_user');
    }
  },
};
