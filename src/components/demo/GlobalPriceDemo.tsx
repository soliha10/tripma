'use client';

import { useFlight } from '@/context/FlightContext';
import PriceSummary from '@/components/shared/PriceSummary/PriceSummary';
import { useTranslations } from 'next-intl';

export default function GlobalPriceDemo() {
  const t = useTranslations('DetailPage');
  const { selectedDepartFlight, selectedReturnFlight, priceCalculations, tripType } = useFlight();

  const { subtotal, taxesAndFees, total } = priceCalculations;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>{t('globalPriceDemo.title')}</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>{t('globalPriceDemo.flightSelectionStatus')}</h3>
        <p>
          <strong>{t('globalPriceDemo.tripTypeLabel')}:</strong>{' '}
          {tripType === 'round' ? t('globalPriceDemo.roundTrip') : t('globalPriceDemo.oneWay')}
        </p>
        <p>
          <strong>{t('globalPriceDemo.departingFlightLabel')}:</strong>{' '}
          {selectedDepartFlight
            ? `${selectedDepartFlight.airlineType} - ${selectedDepartFlight.price}`
            : t('globalPriceDemo.notSelected')}
        </p>
        <p>
          <strong>{t('globalPriceDemo.returnFlightLabel')}:</strong>{' '}
          {selectedReturnFlight
            ? `${selectedReturnFlight.airlineType} - ${selectedReturnFlight.price}`
            : t('globalPriceDemo.notSelected')}
        </p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>{t('globalPriceDemo.directAccessTitle')}</h3>
        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          <p>
            <strong>{t('globalPriceDemo.subtotalLabel')}:</strong> ${subtotal.toFixed(2)}
          </p>
          <p>
            <strong>{t('globalPriceDemo.taxesFeesLabel')}:</strong> ${taxesAndFees.toFixed(2)}
          </p>
          <p>
            <strong>{t('globalPriceDemo.totalLabel')}:</strong> ${total.toFixed(2)}
          </p>
        </div>
      </div>

      <div>
        <h3>{t('globalPriceDemo.priceSummaryTitle')}</h3>
        <PriceSummary />
      </div>

      <div
        style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '8px' }}
      >
        <h4>{t('globalPriceDemo.successTitle')}</h4>
        <p>{t('globalPriceDemo.successMessage')}</p>
        <ul>
          <li>{t('globalPriceDemo.successList.flightsSelected')}</li>
          <li>{t('globalPriceDemo.successList.tripTypeChanges')}</li>
          <li>{t('globalPriceDemo.successList.pageNavigation')}</li>
        </ul>
        <p>{t('globalPriceDemo.successFooter')}</p>
      </div>
    </div>
  );
}
