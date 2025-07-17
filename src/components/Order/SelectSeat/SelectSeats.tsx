'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import menu from '@/app/[locale]/assets/images/menu.svg';
import logo from '@/app/[locale]/assets/images/Wordmark.svg';
import arrow from '@/app/[locale]/assets/images/arrow-white.svg';
import economy from '@/app/[locale]/assets/images/Economy Seats.svg';
import busines from '@/app/[locale]/assets/images/Business Seats.svg';
import check from '@/app/[locale]/assets/images/check heavy.svg';
import point from '@/app/[locale]/assets/images/point heavy.svg';
import chevron from '@/app/[locale]/assets/images/chevron.svg';
import bgPlane from '@/app/[locale]/assets/images/bg-plane.svg';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { useFlight } from '@/context/FlightContext';
import SeatMap from './SeatMap';
import SelectModal from './SelectModal';
import styles from './css/SelectSeats.module.css';

export default function SelectSeats() {
  const [selectTab, setSelectTab] = useState<'depart' | 'return'>('depart');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSeatDepart, setSelectedSeatDepart] = useState<{ row: number; col: string } | null>(
    null,
  );
  const [selectedSeatReturn, setSelectedSeatReturn] = useState<{ row: number; col: string } | null>(
    null,
  );

  const { passenger } = useFlight();
  const router = useRouter();

  const economyItem = [
    'Built-in entertainment system',
    'Complimentary snacks and drinks',
    'One free carry-on and personal item',
  ];
  const businessItem = [
    'Extended leg room',
    'First two checked bags free',
    'Priority boarding',
    'Personalized service',
    'Enhanced food and drink service',
    'Seats that recline 40% more than economy',
  ];

  const toggleDepart = () => setSelectTab('depart');
  const toggleReturn = () => setSelectTab('return');

  const handleBtn = () => setSelectTab(selectTab === 'depart' ? 'return' : 'depart');
  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/payment');
  };

  return (
    <section className={styles.selectSeats}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.logoRow}>
            <Button className={styles.menuButton} aria-label="Open menu">
              <Image src={menu} alt="Menu" width={24} height={24} />
            </Button>
            <a href="/" className={styles.logoLink}>
              <Image src={logo} alt="Logo" width={100} height={40} />
            </a>
          </div>

          <div className={styles.planeWrapper}>
            <Image src={bgPlane} alt="Airplane interior" className={styles.bgPlane} />
            <SeatMap
              selectedSeat={selectTab === 'depart' ? selectedSeatDepart : selectedSeatReturn}
              setSelectedSeat={
                selectTab === 'depart' ? setSelectedSeatDepart : setSelectedSeatReturn
              }
              section={selectTab}
              onBusinessSelect={() => setIsOpenModal(true)}
            />
          </div>
        </div>

        <div className={styles.rightSide}>
          <div className={styles.flightHeader}>
            <div className={styles.flightInfo}>
              <strong className={styles.flightCode}>SFO</strong>
              <span className={styles.flightLocation}>California, US</span>
            </div>
            <Image src={arrow} alt="To" width={24} height={24} />
            <div className={styles.flightInfo}>
              <strong className={styles.flightCode}>NRT</strong>
              <span className={styles.flightLocation}>Tokyo, Japan</span>
            </div>
            <div
              onClick={toggleDepart}
              className={`${styles.flightTab} ${selectTab === 'depart' ? styles.activeTab : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Select departing flight"
            >
              <time className={styles.flightTime}>Feb 25 | 7:00AM</time>
              <span className={styles.flightType}>Departing</span>
              {selectTab === 'depart' && (
                <Image
                  src={chevron}
                  alt="Active tab indicator"
                  className={styles.chevron}
                  width={16}
                  height={16}
                />
              )}
            </div>
            <div
              onClick={toggleReturn}
              className={`${styles.flightTab} ${selectTab === 'return' ? styles.activeTab : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Select returning flight"
            >
              <time className={styles.flightTime}>Mar 21 | 12:15PM</time>
              <span className={styles.flightType}>Arriving</span>
              {selectTab === 'return' && (
                <Image
                  src={chevron}
                  alt="Active tab indicator"
                  className={styles.chevron}
                  width={16}
                  height={16}
                />
              )}
            </div>
          </div>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <Image
                src={economy}
                alt="Economy class"
                className={styles.cardImage}
                width={335}
                height={150}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                  <h3>Economy</h3>
                  <span className={styles.selectedTag}>Selected</span>
                </div>
                <p className={styles.description}>
                  Rest and recharge during your flight with standard leg room, complimentary snacks,
                  and in-flight entertainment.
                </p>
                <span className={`${styles.line} ${styles.economy}`}></span>
                <ul className={styles.features}>
                  {economyItem.map((item, index) => (
                    <li key={index} className={styles.featureItem}>
                      <Image src={point} alt="Feature point" width={16} height={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <Image
                src={busines}
                alt="Business class"
                className={styles.cardImage}
                width={335}
                height={150}
              />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitleText}>Business class</h3>
                <p className={styles.description}>
                  Rest and recharge during your flight with extended leg room, personalized service,
                  and a multi-course meal service.
                </p>
                <span className={`${styles.line} ${styles.business}`}></span>
                <ul className={styles.features}>
                  {businessItem.map((item, index) => (
                    <li key={index} className={styles.featureItem}>
                      <Image src={check} alt="Feature check" width={16} height={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerItem}>
              <span className={styles.footerLabel}>Passenger 1</span>
              <strong className={styles.footerName}>
                {passenger?.firstName} {passenger?.lastName}
              </strong>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerLabel}>Seat number</span>
              <strong className={styles.footerName}>
                {selectTab === 'depart'
                  ? selectedSeatDepart
                    ? `${selectedSeatDepart.row}${selectedSeatDepart.col}`
                    : '--'
                  : selectedSeatReturn
                    ? `${selectedSeatReturn.row}${selectedSeatReturn.col}`
                    : '--'}
              </strong>
            </div>
            <Button
              className={styles.goBack}
              onClick={() => router.back()}
              aria-label="Go back to previous page"
            >
              Go Back
            </Button>
            <Button
              className={`${styles.nextFlight} ${
                (selectTab === 'depart' && selectedSeatDepart) ||
                (selectTab === 'return' && selectedSeatReturn)
                  ? styles.nextActive
                  : styles.nextDisabled
              } ${selectedSeatDepart && selectedSeatReturn ? styles.hidden : ''}`}
              disabled={
                !(
                  (selectTab === 'depart' && selectedSeatDepart) ||
                  (selectTab === 'return' && selectedSeatReturn)
                )
              }
              onClick={handleBtn}
              aria-label="Proceed to next flight"
            >
              Next flight
            </Button>
            {selectedSeatDepart && selectedSeatReturn && (
              <Button
                onClick={handleNavigate}
                variant="cancel"
                size="cancel"
                className={styles.paymentButton}
                aria-label="Proceed to payment method"
              >
                Payment Method
              </Button>
            )}
          </div>
        </div>

        {isOpenModal && <SelectModal onClose={() => setIsOpenModal(false)} />}
      </div>
    </section>
  );
}
