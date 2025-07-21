'use client';
import Image from 'next/image';
import { useState } from 'react';
import logo from '@/app/[locale]/assets/images/Wordmark.svg';
import menuIcon from '@/app/[locale]/assets/images/menu.svg'; // Assumed menu icon path
import LoginModal from './LoginModal';
import LanguageSwitcher from '@/components/Main/Login/LanguageSwitcher';
import styles from './css/LoginHeader.module.css';
import { useTranslations } from 'next-intl';

export default function LoginHeader() {
  const t = useTranslations('HomePage.LoginHeader');

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className={styles.mainWrapper}>
        <div className={styles.headerMain}>
          <a href="">
            <Image src={logo} alt="Tripma logo" width={131} height={54} className={styles.logo} />
          </a>
          <button type="button" className={styles.menuToggle} onClick={toggleMenu}>
            <Image src={menuIcon} alt="menu" width={32} height={32} className={styles.menuIcon} />
          </button>
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <ul className={styles.navList}>
              <li>
                <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('flights')}
                </a>
              </li>
              <li>
                <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('hotels')}
                </a>
              </li>
              <li>
                <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                  {t('packages')}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.signIn}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('signIn')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={styles.signUp}
                  onClick={() => {
                    setIsOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  {t('signUp')}
                </button>
              </li>
            </ul>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>

      {isOpen && (
        <ul>
          <LoginModal onClose={() => setIsOpen(false)} />
        </ul>
      )}
    </header>
  );
}
