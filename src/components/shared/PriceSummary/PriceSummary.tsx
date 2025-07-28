'use client';

import { useFlight } from '@/context/FlightContext';
import { useTranslations } from 'next-intl';
import styles from './PriceSummary.module.css';

interface PriceSummaryProps {
  showTitle?: boolean;
  className?: string;
}

export default function PriceSummary({ showTitle = true, className = '' }: PriceSummaryProps) {
  const t = useTranslations('DetailPage');
  const { selectedDepartFlight, selectedReturnFlight, priceCalculations } = useFlight();
  const { subtotal, taxesAndFees, total } = priceCalculations;

  if (!selectedDepartFlight && !selectedReturnFlight) {
    return null;
  }

  return (
    <div className={`${styles.container} ${className}`}>
      {showTitle && <h3 className={styles.title}>{t('priceInfo.priceSummary')}</h3>}

      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span className={styles.label}>{t('priceInfo.subtotal')}</span>
          <span className={styles.value}>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.label}>{t('priceInfo.taxesAndFees')}</span>
          <span className={styles.value}>${taxesAndFees.toFixed(2)}</span>
        </div>
        <div className={`${styles.summaryRow} ${styles.totalRow}`}>
          <span className={styles.label}>{t('priceInfo.total')}</span>
          <span className={styles.value}>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Show selected flights info */}
      <div className={styles.flightInfo}>
        {selectedDepartFlight && (
          <div className={styles.flightItem}>
            <span className={styles.flightLabel}>Departing:</span>
            <span className={styles.flightDetails}>
              {selectedDepartFlight.airlineType} - {selectedDepartFlight.price}
            </span>
          </div>
        )}
        {selectedReturnFlight && (
          <div className={styles.flightItem}>
            <span className={styles.flightLabel}>Returning:</span>
            <span className={styles.flightDetails}>
              {selectedReturnFlight.airlineType} - {selectedReturnFlight.price}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
