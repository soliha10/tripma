import { User } from './auth-actions';

export const ClientStorage = {
  setUser(user: User | null) {
    if (!user) {
      localStorage.removeItem('user');
      return;
    }
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        photoURL: user.photoURL,
        createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
      }),
    );
  },
  getUser(): User | null {
    const user = localStorage.getItem('user');
    if (!user) return null;
    try {
      const parsed = JSON.parse(user);
      return {
        ...parsed,
        createdAt: new Date(parsed.createdAt),
      };
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  },
  clearUser() {
    localStorage.removeItem('user');
  },
};
