'use client';
import Image from 'next/image';
import { useState } from 'react';
import close from '@/app/assets/images/close-cookie.svg';
import styles from './css/LoginCookies.module.css';

export default function LoginCookies() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className={styles.cookieBox}>
      <div className={styles.cookieTop}>
        <span className={styles.cookieText}>By using our site, you agree to eat our cookies.</span>
        <Image
          src={close}
          alt="Close"
          className={styles.closeIcon}
          onClick={() => setIsVisible(false)}
        />
      </div>

      <div className={styles.cookieActions}>
        <button className={styles.acceptBtn}>Accept cookies</button>
        <button className={styles.settingsBtn}>Go to settings</button>
      </div>
    </div>
  );
}
