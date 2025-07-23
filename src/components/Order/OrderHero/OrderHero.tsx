'use client';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'; // Import useTranslations
import Image from 'next/image';
import Footer from '@/components/Main/Footer/Footer';
import LoginHeader from '@/components/Main/Login/LoginHeader';
import OrderForm from './OrderForm';
import { useFlight } from '@/context/FlightContext';
import SelectedItem from '@/components/Details/DetailHero/SelectedItem';
import { Button } from '@/components/ui/button';
import bags from '@/app/[locale]/assets/images/bags.svg';
import styles from './css/OrderHero.module.css';

export default function OrderHero() {
  const t = useTranslations('OrderHero'); // Use the OrderHero namespace
  const { selectedDepartFlight, selectedReturnFlight, priceCalculations } = useFlight();
  const { subtotal, taxesAndFees, total } = priceCalculations;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [knownTraveller, setKnownTraveller] = useState('');
  const router = useRouter();

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/select-seat');
  };

  return (
    <>
      <LoginHeader />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.formIntro}>
              <h1 className={styles.title}>{t('title')}</h1>
              <p className={styles.subtitle}>{t('subtitle')}</p>
            </div>
            <div className={styles.mainContent}>
              <OrderForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                knownTraveller={knownTraveller}
                setKnownTraveller={setKnownTraveller}
              />
              <div className={styles.summaryBox}>
                {selectedDepartFlight && (
                  <div className={styles.selectedItemWrapper}>
                    <SelectedItem {...selectedDepartFlight} />
                  </div>
                )}
                {selectedReturnFlight && (
                  <div className={styles.selectedItemWrapper}>
                    <SelectedItem {...selectedReturnFlight} />
                  </div>
                )}
                <div className={styles.priceSummary}>
                  <div>
                    <span className={styles.summaryLabel}>{t('subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className={styles.summaryLabel}>{t('taxesAndFees')}</span>
                    <span>${taxesAndFees.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className={styles.summaryLabel}>{t('total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  type="button"
                  className={`${styles.selectButton} ${
                    firstName && lastName && birthDate && email && phoneNumber && knownTraveller
                      ? styles.active
                      : styles.disabled
                  }`}
                  disabled={
                    !(firstName && lastName && birthDate && email && phoneNumber && knownTraveller)
                  }
                  onClick={handleNavigate}
                  aria-label={t('proceedToSelectSeats')}
                >
                  {t('selectSeats')}
                </Button>
                <Image
                  src={bags}
                  alt={t('baggageIllustration')}
                  width={400}
                  height={200}
                  className={styles.bagsImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
