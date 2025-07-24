'use server';

import { cookies } from 'next/headers';
import fs from 'fs';
import path from 'path';

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

interface DatabaseData {
  users: User[];
  sessions: Record<string, User>;
}

// Database file path
const DB_PATH = path.join(process.cwd(), 'db.json');

// Helper functions for database operations
function readDatabase(): DatabaseData {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initialData: DatabaseData = { users: [], sessions: {} };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(DB_PATH, 'utf8');
    const parsed = JSON.parse(data);
    // Convert createdAt strings back to Date objects
    parsed.users = parsed.users.map((user: User & { createdAt: string }) => ({
      ...user,
      createdAt: new Date(user.createdAt),
    }));
    return parsed;
  } catch (error) {
    console.error('Error reading database:', error);
    return { users: [], sessions: {} };
  }
}

function writeDatabase(data: DatabaseData): void {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing database:', error);
  }
}

function getUsers(): User[] {
  const db = readDatabase();
  return db.users;
}

function addUser(user: User): void {
  const db = readDatabase();
  db.users.push(user);
  writeDatabase(db);
}

function setSession(token: string, user: User): void {
  const db = readDatabase();
  db.sessions[token] = user;
  writeDatabase(db);
}

function getSession(token: string): User | null {
  const db = readDatabase();
  return db.sessions[token] || null;
}

function removeSession(token: string): void {
  const db = readDatabase();
  delete db.sessions[token];
  writeDatabase(db);
}

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
  const existingUsers = getUsers();
  if (email && existingUsers.find((user) => user.email === email)) {
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

    addUser(newUser);

    // Create session
    const sessionToken = generateSessionToken();
    setSession(sessionToken, newUser);

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
    // Find user
    const existingUsers = getUsers();
    const user = existingUsers.find((u: User) => u.email === email);

    if (!user) {
      return {
        errors: {
          general: ['Invalid email or password'],
        },
      };
    }

    // Create session
    const sessionToken = generateSessionToken();
    setSession(sessionToken, user);

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
    removeSession(sessionToken);
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

  return getSession(sessionToken);
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
