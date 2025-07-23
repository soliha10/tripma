'use client';
import Image from 'next/image';
import close from '@/app/[locale]/assets/images/close-sign-up.svg';
import Email from './Email';
import google from '@/app/[locale]/assets/images/color.svg';
import apple from '@/app/[locale]/assets/images/apple mac.svg';
import facebook from '@/app/[locale]/assets/images/facebook.svg';
import { useActionState, useEffect, useState } from 'react';
import styles from './css/LoginModal.module.css';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { register, login } from '@/lib/auth-actions';
import { useAuth } from '@/context/AuthContext';
export interface EmailType {
  id: number;
  pic: string;
  text: string;
}
interface Props {
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function LoginModal({ onClose, initialMode = 'register' }: Props) {
  const t = useTranslations('HomePage.LoginModal');
  const { refreshUser } = useAuth();
  const [isLogin, setIsLogin] = useState(initialMode === 'login');

  const emails: EmailType[] = [
    { id: 1, pic: google, text: t('google') },
    { id: 2, pic: apple, text: t('apple') },
    { id: 3, pic: facebook, text: t('facebook') },
  ];

  const [registerState, registerAction, isRegisterPending] = useActionState(register, undefined);
  const [loginState, loginAction, isLoginPending] = useActionState(login, undefined);

  const currentState = isLogin ? loginState : registerState;
  const currentAction = isLogin ? loginAction : registerAction;
  const isPending = isLogin ? isLoginPending : isRegisterPending;

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  useEffect(() => {
    if (currentState?.success) {
      // Refresh user state and close modal on successful auth
      refreshUser().then(() => {
        setTimeout(() => {
          onClose();
        }, 1500);
      });
    }
  }, [currentState?.success, onClose, refreshUser]);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <strong className={styles.modalTitle}>{isLogin ? t('signInTitle') : t('title')}</strong>
          <Image src={close} alt="Close" className={styles.modalClose} onClick={onClose} />
        </div>
        <p className={styles.modalSubtitle}>{isLogin ? t('signInSubtitle') : t('subtitle')}</p>

        {/* Auth Status Messages */}
        {currentState?.success && (
          <div className={styles.successMessage}>{currentState.message}</div>
        )}
        {currentState?.errors?.general && (
          <div className={styles.errorMessage}>{currentState.errors.general[0]}</div>
        )}

        <form action={currentAction} className={styles.modalForm}>
          {!isLogin && (
            <>
              <Input
                className={styles.inputField}
                type="text"
                name="name"
                placeholder={t('fullName')}
              />
              {currentState?.errors?.name && (
                <p className={styles.fieldError}>{currentState.errors.name[0]}</p>
              )}
            </>
          )}

          <Input
            className={styles.inputField}
            type="email"
            name="email"
            placeholder={t('email')}
            required
          />
          {currentState?.errors?.email && (
            <p className={styles.fieldError}>{currentState.errors.email[0]}</p>
          )}

          <Input
            className={styles.inputField}
            type="password"
            name="password"
            placeholder={t('password')}
            required
          />
          {currentState?.errors?.password && (
            <p className={styles.fieldError}>{currentState.errors.password[0]}</p>
          )}
          {!isLogin && (
            <Label className={styles.checkboxLabel}>
              <div className={styles.checkboxGroup}>
                <Input className="w-4 h-4" type="checkbox" required />
                <span>
                  {t('terms')}{' '}
                  <Link className={styles.termsLink} href="/">
                    {t('termsLink')}
                  </Link>
                </span>
              </div>
              <div className={styles.checkboxGroup}>
                <Input className="w-4 h-4" type="checkbox" required />
                <span>{t('sendAlerts')}</span>
              </div>
            </Label>
          )}

          <Button className={styles.submitBtn} disabled={isPending}>
            {isPending ? t('processing') : isLogin ? t('signInButton') : t('createAccount')}
          </Button>

          {/* Toggle between login and register */}
          <div className={styles.toggleContainer}>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className={styles.toggleButton}
            >
              {isLogin ? t('needAccount') : t('haveAccount')}
            </button>
          </div>
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
