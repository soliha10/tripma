'use client';
import Image from 'next/image';
import { useState } from 'react';
import close from '@/app/assets/images/x-close-no.svg';
import logo from '@/app/assets/images/Wordmark.svg';
import LoginModal from './LoginModal';
import styles from './css/LoginHeader.module.css';

export default function LoginHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      {isVisible && (
        <div className={styles.headerBanner}>
          <div className={styles.bannerWrapper}>
            <div className={styles.bannerContent}>
              <p className={styles.bannerText}>
                Join Tripma today and save up to 20% on your flight using code TRAVEL at checkout.
                Promotion valid for new users only.
              </p>
              <Image
                src={close}
                alt="icon"
                width={32}
                height={32}
                className={styles.closeIcon}
                onClick={() => setIsVisible(false)}
              />
            </div>
          </div>
        </div>
      )}

      <div className={styles.mainWrapper}>
        <div className={styles.headerMain}>
          <a href="">
            <Image src={logo} alt="Tripma logo" width={131} height={54} />
          </a>
          <nav>
            <ul className={styles.navList}>
              <li>
                <a href="" className={styles.navLink}>
                  Flights
                </a>
              </li>
              <li>
                <a href="" className={styles.navLink}>
                  Hotels
                </a>
              </li>
              <li>
                <a href="" className={styles.navLink}>
                  Packages
                </a>
              </li>
              <li>
                <button type="button" className={styles.signIn}>
                  Sign in
                </button>
              </li>
              <li>
                <button type="button" className={styles.signUp} onClick={() => setIsOpen(true)}>
                  Sign up
                </button>
              </li>
            </ul>
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
