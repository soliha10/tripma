'use client';
import Footer from '@/components/Main/Footer/Footer';
import LoginHeader from '@/components/Main/Login/LoginHeader';
import OrderForm from './OrderForm';
import Image from 'next/image';
import bags from '@/app/assets/images/bags.svg';
import { useFlight } from '@/context/FlightContext';
import SelectedItem from '@/components/Details/DetailHero/SelectedItem';
import { Button } from '@/components/ui/button';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './css/OrderHero.module.css';

export default function OrderHero() {
  const { selectedDepartFlight, selectedReturnFlight } = useFlight();

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
              <h1 className={styles.title}>Passenger information</h1>
              <p className={styles.subtitle}>
                Enter the required information for each traveler and be sure that it exactly matches
                the government-issued ID presented at the airport.
              </p>
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
                    <span>Subtotal</span>
                    <span>$503</span>
                  </div>
                  <div>
                    <span>Taxes and Fees</span>
                    <span>$503</span>
                  </div>
                  <div>
                    <span>Total</span>
                    <span>$503</span>
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
                >
                  Select seats
                </Button>
                <Image src={bags} alt="bags" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
