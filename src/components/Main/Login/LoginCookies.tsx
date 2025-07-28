'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import close from '@/app/[locale]/assets/images/close-cookie.svg';
import styles from './css/LoginCookies.module.css';
import { useTranslations } from 'next-intl';

export default function LoginCookies() {
  const [isVisible, setIsVisible] = useState(true);
  const [showCookies, setShowCookies] = useState(false);

  const t = useTranslations('HomePage.CookieNotification');

  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.querySelector('form');
      if (formElement) {
        const formRect = formElement.getBoundingClientRect();
        const distanceFromTop = formRect.top;
        if (distanceFromTop <= 400) {
          setShowCookies(true);
        } else {
          setShowCookies(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible || !showCookies) return null;

  return (
    <div className={styles.cookieBox}>
      <div className={styles.cookieTop}>
        <span className={styles.cookieText}>{t('message')}</span>
        <Image
          src={close}
          alt="Close"
          className={styles.closeIcon}
          onClick={() => setIsVisible(false)}
        />
      </div>

      <div className={styles.cookieActions}>
        <button className={styles.acceptBtn} onClick={() => setIsVisible(false)}>
          {t('acceptCookies')}
        </button>
        <button className={styles.settingsBtn}>{t('settingsBtn')}</button>
      </div>
    </div>
  );
}
