'use server';
import { cookies } from 'next/headers';
import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { MONGODB_URI } from '../../env.mjs';

interface Session {
  token: string;
  expiresAt: Date;
}

interface UserDocument extends Document {
  _id: string;
  email: string;
  name?: string;
  photoURL?: string;
  password: string;
  sessions: Session[];
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  photoURL?: string;
  createdAt: Date;
}

interface AuthState {
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    general?: string[];
  };
  message?: string;
  success?: boolean;
  user?: User;
}

function isUser(doc: UserDocument | null | undefined): doc is UserDocument {
  return (
    doc !== null &&
    doc !== undefined &&
    typeof doc.email === 'string' &&
    doc.createdAt instanceof Date
  );
}

function transformToUser(doc: UserDocument): User {
  if (!isUser(doc)) {
    throw new Error('Invalid user document');
  }
  return {
    id: doc._id.toString(),
    email: doc.email,
    name: doc.name,
    photoURL: doc.photoURL,
    createdAt: doc.createdAt,
  };
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: String,
    photoURL: String,
    password: { type: String, required: true },
    sessions: [
      {
        token: String,
        expiresAt: Date,
      },
    ],
    createdAt: Date,
  },
  { timestamps: true },
);

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

mongoose.set('strictQuery', true);

let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URI);
      cached.conn = await cached.promise;
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      cached.promise = null;
      throw error;
    }
  } else {
    cached.conn = await cached.promise;
  }
  return cached.conn;
}

function generateSessionToken(): string {
  return crypto.randomUUID();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

export async function register(
  prevState: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  await connectDB();

  const email = formData.get('email')?.toString().trim() || '';
  const password = formData.get('password')?.toString() || '';
  const name = formData.get('name')?.toString().trim() || '';

  const errors: AuthState['errors'] = {};

  if (!email || !isValidEmail(email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!password || !isValidPassword(password)) {
    errors.password = ['Password must be at least 6 characters long'];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      errors.email = ['This email is already registered'];
      return { errors };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      name: name || email.split('@')[0],
      password: hashedPassword,
      sessions: [],
      createdAt: new Date(),
    });

    const sessionToken = generateSessionToken();
    await User.findByIdAndUpdate(newUser._id, {
      $push: {
        sessions: {
          token: sessionToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return {
      success: true,
      message: 'Account created successfully!',
      user: transformToUser(newUser),
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      errors: {
        general: ['Something went wrong. Please try again.'],
      },
    };
  }
}

export async function login(
  prevState: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  await connectDB();

  const email = formData.get('email')?.toString().trim() || '';
  const password = formData.get('password')?.toString() || '';

  const errors: AuthState['errors'] = {};

  if (!email || !isValidEmail(email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!password) {
    errors.password = ['Please enter a password'];
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: {
          general: ['Invalid email or password'],
        },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        errors: {
          general: ['Invalid email or password'],
        },
      };
    }

    const sessionToken = generateSessionToken();
    await User.findByIdAndUpdate(user._id, {
      $push: {
        sessions: {
          token: sessionToken,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      },
    });

    const cookieStore = await cookies();
    cookieStore.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return {
      success: true,
      message: 'You have successfully logged in!',
      user: transformToUser(user),
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      errors: {
        general: ['Something went wrong. Please try again.'],
      },
    };
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;

  if (sessionToken) {
    await connectDB();
    await User.updateOne(
      { 'sessions.token': sessionToken },
      { $pull: { sessions: { token: sessionToken } } },
    );
    cookieStore.delete('session');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('session')?.value;
  if (!sessionToken) return null;

  await connectDB();
  const user = await User.findOne({
    'sessions.token': sessionToken,
    'sessions.expiresAt': { $gt: new Date() },
  });

  return user ? transformToUser(user) : null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}
