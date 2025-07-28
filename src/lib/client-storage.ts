'use client';

import { User } from './auth-actions';

export const ClientStorage = {
  setUser: (user: User | null) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('tripma_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('tripma_user');
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

  setAuthToken: (token: string | null) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('tripma_auth_token', token);
      } else {
        localStorage.removeItem('tripma_auth_token');
      }
    }
  },

  getAuthToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tripma_auth_token');
    }
    return null;
  },

  clearAuthToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tripma_auth_token');
    }
  },
};
