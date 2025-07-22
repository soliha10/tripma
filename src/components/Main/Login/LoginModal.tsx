'use client';
import Image from 'next/image';
import close from '@/app/[locale]/assets/images/close-sign-up.svg';
import Email from './Email';
import google from '@/app/[locale]/assets/images/color.svg';
import apple from '@/app/[locale]/assets/images/apple mac.svg';
import facebook from '@/app/[locale]/assets/images/facebook.svg';
import { useEffect } from 'react';
import styles from './css/LoginModal.module.css';
import { useTranslations } from 'next-intl';
export interface EmailType {
  id: number;
  pic: string;
  text: string;
}
interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const t = useTranslations('HomePage.LoginModal');
  const emails: EmailType[] = [
    { id: 1, pic: google, text: t('google') },
    { id: 2, pic: apple, text: t('apple') },
    { id: 3, pic: facebook, text: t('facebook') },
  ];

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <strong className={styles.modalTitle}>{t('title')}</strong>
          <Image src={close} alt="Close" className={styles.modalClose} onClick={onClose} />
        </div>
        <p className={styles.modalSubtitle}>{t('subtitle')}</p>

        <form action="" className={styles.modalForm}>
          <input className={styles.inputField} type="text" placeholder={t('email')} />
          <input className={styles.inputField} type="text" placeholder={t('password')} />
          <label>
            <div className={styles.checkboxGroup}>
              <input className="w-4 h-4" type="checkbox" />
              <span>{t('terms')}</span>
            </div>
            <div className={styles.checkboxGroup}>
              <input className="w-4 h-4" type="checkbox" />
              <span>{t('sendAlerts')}</span>
            </div>
          </label>
          <button className={styles.submitBtn}>{t('createAccount')}</button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>{t('devider')}</span>
          <span className={styles.dividerLine}></span>
        </div>

        <ul className={styles.socialList}>
          {emails.map(({ id, pic, text }) => (
            <Email key={id} pic={pic} text={text} id={id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
