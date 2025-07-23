'use client';
import Image from 'next/image';
import { useState } from 'react';
import logo from '@/app/[locale]/assets/images/Wordmark.svg';
import menuIcon from '@/app/[locale]/assets/images/menu.svg'; // Assumed menu icon path
import LoginModal from './LoginModal';
import LanguageSwitcher from '@/components/Main/Login/LanguageSwitcher';
import styles from './css/LoginHeader.module.css';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/auth-actions';

export default function LoginHeader() {
  const t = useTranslations('HomePage.LoginHeader');
  const { user, loading, refreshUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Track if modal should show login or register
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      // Refresh user state after logout to update UI immediately
      await refreshUser();
      // Optional: redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header>
      <div className={styles.mainWrapper}>
        <div className={styles.headerMain}>
          <Link href="">
            <Image
              src={logo}
              alt="TripmLink logo"
              width={131}
              height={54}
              className={styles.logo}
            />
          </Link>
          <button type="button" className={styles.menuToggle} onClick={toggleMenu}>
            <Image src={menuIcon} alt="menu" width={32} height={32} className={styles.menuIcon} />
          </button>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li>
                <Link href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('flights')}
                </Link>
              </li>
              <li>
                <Link href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('hotels')}
                </Link>
              </li>
              <li>
                <Link href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('packages')}
                </Link>
              </li>
              {!loading && !user ? (
                <>
                  <li>
                    <button
                      type="button"
                      className={styles.signIn}
                      onClick={() => {
                        setIsLogin(true);
                        setIsOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('signIn')}
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.signUp}
                      onClick={() => {
                        setIsLogin(false);
                        setIsOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('signUp')}
                    </button>
                  </li>
                </>
              ) : user ? (
                <>
                  <li>
                    <Link href="/" className={styles.myTrips} onClick={() => setIsMenuOpen(false)}>
                      {t('myTrips')}
                    </Link>
                  </li>
                  <li className={styles.userMenuContainer}>
                    <button
                      type="button"
                      className={styles.userAvatar}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                      {getInitials(user.email)}
                    </button>
                    {showUserMenu && (
                      <div className={styles.userDropdown}>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>{user.name}</span>
                          <span className={styles.userEmail}>{user.email}</span>
                        </div>
                        <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                          {t('logout')}
                        </button>
                      </div>
                    )}
                  </li>
                </>
              ) : null}
            </ul>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>

      {isOpen && (
        <ul>
          <LoginModal
            onClose={() => setIsOpen(false)}
            initialMode={isLogin ? 'login' : 'register'}
          />
        </ul>
      )}
    </header>
  );
}
