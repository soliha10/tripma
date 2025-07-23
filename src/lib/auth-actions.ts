'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Types for authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
}

export interface AuthState {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    general?: string[];
  };
  message?: string;
  success?: boolean;
}

// Simple in-memory storage for demo (replace with database in production)
const users: User[] = [];
const sessions: Map<string, User> = new Map();

// Helper function to generate session token
function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate password
function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

// Register action
export async function register(
  prevState: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  // Validation
  const errors: AuthState['errors'] = {};

  if (!email || !isValidEmail(email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!password || !isValidPassword(password)) {
    errors.password = ['Password must be at least 6 characters long'];
  }

  // Check if user already exists
  if (email && users.find((user) => user.email === email)) {
    errors.email = ['An account with this email already exists'];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2),
      email,
      name: name || email.split('@')[0],
      createdAt: new Date(),
    };

    users.push(newUser);

    // Create session
    const sessionToken = generateSessionToken();
    sessions.set(sessionToken, newUser);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, message: 'Account created successfully!' };
  } catch (error) {
    console.log(error);
    return {
      errors: {
        general: ['Something went wrong. Please try again.'],
      },
    };
  }
}

// Login action
export async function login(
  prevState: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validation
  const errors: AuthState['errors'] = {};

  if (!email || !isValidEmail(email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!password) {
    errors.password = ['Password is required'];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    // Find user (in production, you'd verify password hash)
    const user = users.find((u) => u.email === email);

    if (!user) {
      return {
        errors: {
          general: ['Invalid email or password'],
        },
      };
    }

    // Create session
    const sessionToken = generateSessionToken();
    sessions.set(sessionToken, user);

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, message: 'Logged in successfully!' };
  } catch (error) {
    console.log(error);
    return {
      errors: {
        general: ['Something went wrong. Please try again.'],
      },
    };
  }
}

// Logout action
export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (sessionToken) {
    sessions.delete(sessionToken);
    cookieStore.delete('session');
  }

  // Don't redirect here, let the client handle it
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (!sessionToken) {
    return null;
  }

  return sessions.get(sessionToken) || null;
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
