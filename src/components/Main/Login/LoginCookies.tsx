'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import close from '@/app/[locale]/assets/images/close-cookie.svg';
import styles from './css/LoginCookies.module.css';

export default function LoginCookies() {
  const [isVisible, setIsVisible] = useState(true);
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Form elementini topish uchun
      const formElement = document.querySelector('form');
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const distanceFromTop = formRect.top;

        // Agar form tepadan 115px yoki undan kam masofada bo'lsa, cookies ko'rsatish
        if (distanceFromTop <= 400) {
          setShowCookies(true);
        } else {
          setShowCookies(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Dastlabki holatni tekshirish
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible || !showCookies) return null;

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
        <button className={styles.acceptBtn} onClick={() => setIsVisible(false)}>
          Accept cookies
        </button>
        <button className={styles.settingsBtn}>Go to settings</button>
      </div>
    </div>
  );
}
