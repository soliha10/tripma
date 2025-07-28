'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFlight } from '@/context/FlightContext';
import styles from './css/SelectModal.module.css';

export default function SelectModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations('SelectSeat.SelectModal');
  const router = useRouter();
  const { setUpgraded } = useFlight();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleUpgrade = () => {
    setUpgraded(true);
    onClose();
    router.push('/summary');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <strong className={styles.title}>{t('title')}</strong>
        <p className={styles.description}>{t('description')}</p>
        <div className={styles.actions}>
          <Button variant="cancel" size="cancel" onClick={onClose} aria-label={t('cancelAria')}>
            {t('cancel')}
          </Button>
          <Button
            variant="upgrade"
            size="upgrade"
            onClick={handleUpgrade}
            aria-label={t('upgradeAria')}
          >
            {t('upgrade')}
          </Button>
        </div>
      </div>
    </div>
  );
}
