'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/auth-actions';
import LanguageSwitcher from '@/components/Main/Login/LanguageSwitcher';
import LoginModal from '@/components/Main/Login/LoginModal';
import menuIcon from '@/app/[locale]/assets/images/menu.svg';
import logo from '@/app/[locale]/assets/images/Wordmark.svg';
import styles from './css/Header.module.css';

export default function Header() {
  const t = useTranslations('Header');
  const { user, loading, refreshUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
      await refreshUser();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className={styles.header}>
      <div className={styles.mainWrapper}>
        <div className={styles.headerMain}>
          <Link href="/" className={styles.logoLink}>
            <Image src={logo} alt="Tripma Logo" width={131} height={54} className={styles.logo} />
          </Link>
          <button type="button" className={styles.menuToggle} onClick={toggleMenu}>
            <Image src={menuIcon} alt="Menu" width={32} height={32} className={styles.menuIcon} />
          </button>

          <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
            <ul className={styles.navList}>
              <li>
                <Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('flights')}
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('hotels')}
                </Link>
              </li>
              <li>
                <Link href="#" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
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
                        setIsLoginModalOpen(true);
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
                        setIsLoginModalOpen(true);
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
                    <Link
                      href="/my-trips"
                      className={styles.myTrips}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('myTrips')}
                    </Link>
                  </li>
                  <li className={styles.userMenuContainer}>
                    <button
                      type="button"
                      className={styles.userAvatar}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      aria-expanded={showUserMenu}
                      aria-label={t('userMenuAria')}
                    >
                      {getInitials(user.email)}
                    </button>
                    {showUserMenu && (
                      <div className={styles.userDropdown}>
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>
                            {user.name || user.email.split('@')[0]}
                          </span>
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

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          initialMode={isLogin ? 'login' : 'register'}
        />
      )}
    </header>
  );
}
