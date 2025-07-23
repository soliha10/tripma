'use client';

import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/auth-actions';
import { Button } from '@/components/ui/button';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={styles.userProfile}>
      <div className={styles.userInfo}>
        <span className={styles.userName}>Welcome, {user.name}</span>
        <span className={styles.userEmail}>{user.email}</span>
      </div>
      <Button onClick={handleLogout} className={styles.logoutBtn}>
        Logout
      </Button>
    </div>
  );
}
