'use client';
import Image from 'next/image';
import close from '@/app/[locale]/assets/images/close-sign-up.svg';
import Email from './Email';
import google from '@/app/[locale]/assets/images/color.svg';
import apple from '@/app/[locale]/assets/images/apple mac.svg';
import facebook from '@/app/[locale]/assets/images/facebook.svg';
import { useEffect } from 'react';
import styles from './css/LoginModal.module.css';

export interface EmailType {
  id: number;
  pic: string;
  text: string;
}
interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const emails: EmailType[] = [
    { id: 1, pic: google, text: 'Continue with Google' },
    { id: 2, pic: apple, text: 'Continue with Apple' },
    { id: 3, pic: facebook, text: 'Continue with Facebook' },
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
          <strong className={styles.modalTitle}>Sign up for Tripma</strong>
          <Image src={close} alt="Close" className={styles.modalClose} onClick={onClose} />
        </div>
        <p className={styles.modalSubtitle}>
          Tripma is totally free to use. Sign up using your email address or phone number below to
          get started.
        </p>

        <form action="" className={styles.modalForm}>
          <input className={styles.inputField} type="text" placeholder="Email or phone number" />
          <input className={styles.inputField} type="text" placeholder="Password" />
          <label>
            <div className={styles.checkboxGroup}>
              <input className="w-4 h-4" type="checkbox" />
              <span>
                I agree to the <a href="#">terms and conditions</a>
              </span>
            </div>
            <div className={styles.checkboxGroup}>
              <input className="w-4 h-4" type="checkbox" />
              <span>Send me the latest deal alerts</span>
            </div>
          </label>
          <button className={styles.submitBtn}>Create account</button>
        </form>

        <div className={styles.divider}>
          <span className={styles.dividerLine}></span>
          <span className={styles.dividerText}>or</span>
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
