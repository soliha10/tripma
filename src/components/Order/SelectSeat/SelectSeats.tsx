'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
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
import { useAuth } from '@/context/AuthContext';
import SeatMap from './SeatMap';
import SelectModal from './SelectModal';
import styles from './css/SelectSeats.module.css';
import LanguageSwitcher from '@/components/Main/Login/LanguageSwitcher';
import LoginModal from '@/components/Main/Login/LoginModal';

export default function SelectSeats() {
  const t = useTranslations('SelectSeat.SelectSeats'); // Use the SelectSeats namespace
  const [selectTab, setSelectTab] = useState<'depart' | 'return'>('depart');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedSeatDepart, setSelectedSeatDepart] = useState<{ row: number; col: string } | null>(
    null,
  );
  const [selectedSeatReturn, setSelectedSeatReturn] = useState<{ row: number; col: string } | null>(
    null,
  );

  const { passenger } = useFlight();
  const { user } = useAuth();
  const router = useRouter();

  const economyItem = [
    t('economyFeatures.entertainment'),
    t('economyFeatures.snacks'),
    t('economyFeatures.carryOn'),
  ];
  const businessItem = [
    t('businessFeatures.legRoom'),
    t('businessFeatures.checkedBags'),
    t('businessFeatures.priorityBoarding'),
    t('businessFeatures.personalizedService'),
    t('businessFeatures.foodService'),
    t('businessFeatures.reclineSeats'),
  ];

  const toggleDepart = () => setSelectTab('depart');
  const toggleReturn = () => setSelectTab('return');

  const handleBtn = () => {
    if (!user) {
      setIsOpenModal(true);
      return;
    }
    setSelectTab(selectTab === 'depart' ? 'return' : 'depart');
  };
  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!user) {
      setIsOpenModal(true);
      return;
    }
    router.push('/payment');
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsOpenModal(true);
    setIsMenuOpen(false);
  };

  return (
    <section className={styles.selectSeats}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.logoRow}>
            <Button className={styles.menuButton} aria-label={t('openMenuAria')}>
              <Image src={menu} alt={t('menuAlt')} width={24} height={24} onClick={toggleMenu} />
            </Button>
            {isMenuOpen && (
              <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                <ul className={styles.navList}>
                  <li>
                    <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                      {t('flights')}
                    </a>
                  </li>
                  <li>
                    <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                      {t('hotels')}
                    </a>
                  </li>
                  <li>
                    <a href="" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>
                      {t('packages')}
                    </a>
                  </li>
                  <li>
                    {user ? (
                      <div className={styles.userProfile}>
                        <span className={styles.userName}>{user?.name}</span>
                        <button
                          type="button"
                          className={styles.signOut}
                          onClick={() => {
                            // Implement sign out functionality
                            setIsMenuOpen(false);
                          }}
                        >
                          {t('signOut')}
                        </button>
                      </div>
                    ) : (
                      <button type="button" className={styles.signIn} onClick={handleLogin}>
                        {t('signIn')}
                      </button>
                    )}
                  </li>
                  <li>
                    <button
                      type="button"
                      className={styles.signUp}
                      onClick={() => {
                        setIsOpen(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('signUp')}
                    </button>
                  </li>
                </ul>
                <LanguageSwitcher />
              </nav>
            )}
            {isOpen && (
              <ul>
                <LoginModal onClose={() => setIsOpen(false)} />
              </ul>
            )}
            <a href="/" className={styles.logoLink}>
              <Image src={logo} alt={t('logoAlt')} width={100} height={40} />
            </a>
          </div>

          <div className={styles.planeWrapper}>
            <Image src={bgPlane} alt={t('airplaneInteriorAlt')} className={styles.bgPlane} />
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
            <Image src={arrow} alt={t('arrowAlt')} width={24} height={24} />
            <div className={styles.flightInfo}>
              <strong className={styles.flightCode}>NRT</strong>
              <span className={styles.flightLocation}>Tokyo, Japan</span>
            </div>
            <div
              onClick={toggleDepart}
              className={`${styles.flightTab} ${selectTab === 'depart' ? styles.activeTab : ''}`}
              role="button"
              tabIndex={0}
              aria-label={t('selectDepartingFlightAria')}
            >
              <time className={styles.flightTime}>Feb 25 | 7:00AM</time>
              <span className={styles.flightType}>Departing</span>
              {selectTab === 'depart' && (
                <Image
                  src={chevron}
                  alt={t('activeTabIndicatorAlt')}
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
              aria-label={t('selectReturningFlightAria')}
            >
              <time className={styles.flightTime}>Mar 21 | 12:15PM</time>
              <span className={styles.flightType}>Arriving</span>
              {selectTab === 'return' && (
                <Image
                  src={chevron}
                  alt={t('activeTabIndicatorAlt')}
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
                alt={t('economyClassAlt')}
                className={styles.cardImage}
                width={335}
                height={150}
              />
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>
                  <h3>{t('economyTitle')}</h3>
                  <span className={styles.selectedTag}>{t('selectedTag')}</span>
                </div>
                <p className={styles.description}>{t('economyDescription')}</p>
                <span className={`${styles.line} ${styles.economy}`}></span>
                <ul className={styles.features}>
                  {economyItem.map((item, index) => (
                    <li key={index} className={styles.featureItem}>
                      <Image src={point} alt={t('featurePointAlt')} width={16} height={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.card}>
              <Image
                src={busines}
                alt={t('businessClassAlt')}
                className={styles.cardImage}
                width={335}
                height={150}
              />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitleText}>{t('businessTitle')}</h3>
                <p className={styles.description}>{t('businessDescription')}</p>
                <span className={`${styles.line} ${styles.business}`}></span>
                <ul className={styles.features}>
                  {businessItem.map((item, index) => (
                    <li key={index} className={styles.featureItem}>
                      <Image src={check} alt={t('featureCheckAlt')} width={16} height={16} />
                      <p>{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerItem}>
              <span className={styles.footerLabel}>{t('passenger1')}</span>
              <strong className={styles.footerName}>
                {passenger?.firstName} {passenger?.lastName}
              </strong>
            </div>
            <div className={styles.footerItem}>
              <span className={styles.footerLabel}>{t('seatNumber')}</span>
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
              aria-label={t('goBackAria')}
            >
              {t('goBack')}
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
              aria-label={t('nextFlightAria')}
            >
              {t('nextFlight')}
            </Button>
            {selectedSeatDepart && selectedSeatReturn && (
              <Button
                onClick={handleNavigate}
                variant="cancel"
                size="cancel"
                className={styles.paymentButton}
                aria-label={t('paymentMethodAria')}
              >
                {t('paymentMethod')}
              </Button>
            )}
          </div>
        </div>

        {isOpenModal && <SelectModal onClose={() => setIsOpenModal(false)} />}
      </div>
    </section>
  );
}
