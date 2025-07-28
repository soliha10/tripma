'use client';
import MainPage from '@/components/Main/page';
import Image from 'next/image';
import { useState } from 'react';
import close from '@/app/[locale]/assets/images/x-close-no.svg';
import styles from '@/components/Main/Login/css/LoginHeader.module.css';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage.LoginHeader');
  const [isVisible, setIsVisible] = useState(true);
  return (
    <>
      {isVisible && (
        <div className={styles.headerBanner}>
          <div className={styles.bannerWrapper}>
            <div className={styles.bannerContent}>
              <p className={styles.bannerText}>{t('bannerText')}</p>
              <Image
                src={close}
                alt="close"
                width={32}
                height={32}
                className={styles.closeIcon}
                onClick={() => setIsVisible(false)}
              />
            </div>
          </div>
        </div>
      )}
      <MainPage />
    </>
  );
}
