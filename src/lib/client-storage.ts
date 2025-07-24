'use client';

import { User } from './auth-actions';

// Client-side storage utilities for better UX
export const ClientStorage = {
  // Store user data in localStorage for persistence across browser sessions
  setUser: (user: User | null) => {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('tripma_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('tripma_user');
      }
    }
  },

  // Get user data from localStorage
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('tripma_user');
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          // Convert createdAt string back to Date object
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

  // Clear all user data
  clearUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tripma_user');
    }
  },

  // Store authentication token
  setAuthToken: (token: string | null) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('tripma_auth_token', token);
      } else {
        localStorage.removeItem('tripma_auth_token');
      }
    }
  },

  // Get authentication token
  getAuthToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tripma_auth_token');
    }
    return null;
  },

  // Clear authentication token
  clearAuthToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tripma_auth_token');
    }
  },
};
