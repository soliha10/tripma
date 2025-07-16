'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import styles from './css/SelectModal.module.css';

export default function SelectModal({ onClose }: { onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);

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
        <strong className={styles.title}>Upgrade seat</strong>
        <p className={styles.description}>
          Upgrade your seat for only $199, and enjoy 45 percent more leg room, and seats that
          recline 40 percent more than economy.
        </p>
        <div className={styles.actions}>
          <Button variant="cancel" size="cancel" onClick={onClose} aria-label="Cancel upgrade">
            Cancel
          </Button>
          <Button variant="upgrade" size="upgrade" aria-label="Upgrade seat for $199">
            Upgrade for $199
          </Button>
        </div>
      </div>
    </div>
  );
}
