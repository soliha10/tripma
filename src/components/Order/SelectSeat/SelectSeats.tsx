'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import menu from '@/app/assets/images/menu.svg';
import logo from '@/app/assets/images/Wordmark.svg';
import arrow from '@/app/assets/images/arrow-white.svg';
import economy from '@/app/assets/images/Economy Seats.svg';
import busines from '@/app/assets/images/Business Seats.svg';
import check from '@/app/assets/images/check heavy.svg';
import point from '@/app/assets/images/point heavy.svg';
import chevron from '@/app/assets/images/chevron.svg';
import bgPlane from '@/app/assets/images/bg-plane.svg';
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
    <section>
      <div className={styles.selectSeats}>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <div className={styles.logoRow}>
              <Button className="w-8 h-8">
                <Image src={menu} alt="btn" />
              </Button>
              <a href="">
                <Image src={logo} alt="logo" />
              </a>
            </div>

            <div className="w-full overflow-hidden relative">
              <Image src={bgPlane} alt="plane" className={styles.bgPlane} />
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
                <strong className="text-2xl font-extrabold">SFO</strong>
                <span className="text-xs text-[#E9E8FC]">California, US</span>
              </div>

              <Image src={arrow} alt="arrow" />

              <div className={styles.flightInfo}>
                <strong className="text-2xl font-extrabold">NRT</strong>
                <span className="text-xs text-[#E9E8FC]">Tokyo, Japan</span>
              </div>

              <div
                onClick={toggleDepart}
                className={`${styles.flightTab} ${selectTab === 'depart' ? styles.activeTab : ''}`}
              >
                <time>Feb 25 | 7:00AM</time>
                <span className="text-xs">Departing</span>
                {selectTab === 'depart' && (
                  <Image src={chevron} alt="chevron" className={styles.chevron} />
                )}
              </div>

              <div
                onClick={toggleReturn}
                className={`${styles.flightTab} ${selectTab === 'return' ? styles.activeTab : ''}`}
              >
                <time>Mar 21 | 12:15PM</time>
                <span className="text-xs">Arriving</span>
                {selectTab === 'return' && (
                  <Image src={chevron} alt="chevron" className={styles.chevron} />
                )}
              </div>
            </div>

            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <Image src={economy} alt="economy" className="mb-4" />
                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>
                    <h3>Economy</h3>
                    <span className={styles.selectedTag}>Selected</span>
                  </div>
                  <p className={styles.description}>
                    Rest and recharge during your flight with extended leg room, personalized
                    service, and a multi-course meal service
                  </p>
                  <span className={`${styles.line} ${styles.economy}`}></span>

                  <ul className={styles.features}>
                    {economyItem.map((item, index) => (
                      <li key={index} className={styles.featureItem}>
                        <Image src={point} alt="point" />
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className={styles.card}>
                <Image src={busines} alt="business" className="mb-4" />
                <div className={styles.cardBody}>
                  <h3 className="text-[#6E7491] text-[18px] font-semibold mb-4">Business class</h3>
                  <p className={styles.description}>
                    Rest and recharge during your flight with extended leg room, personalized
                    service, and a multi-course meal service
                  </p>
                  <span className={`${styles.line} ${styles.business}`}></span>

                  <ul className={styles.features}>
                    {businessItem.map((item, index) => (
                      <li key={index} className={styles.featureItem}>
                        <Image src={check} alt="check" />
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div className={styles.footerItem}>
                <span>Passenger 1</span>
                <strong>
                  {passenger?.firstName} {passenger?.lastName}
                </strong>
              </div>

              <div className={styles.footerItem}>
                <span>Seat number</span>
                <strong>
                  {selectTab === 'depart'
                    ? selectedSeatDepart
                      ? `${selectedSeatDepart.row}${selectedSeatDepart.col}`
                      : '--'
                    : selectedSeatReturn
                      ? `${selectedSeatReturn.row}${selectedSeatReturn.col}`
                      : '--'}
                </strong>
              </div>

              <Button className={styles.goBack}>Go Back</Button>

              <Button
                className={`${styles.nextFlight} ${
                  (selectTab === 'depart' && selectedSeatDepart) ||
                  (selectTab === 'return' && selectedSeatReturn)
                    ? styles.nextActive
                    : styles.nextDisabled
                } ${selectedSeatDepart && selectedSeatReturn ? 'hidden' : ''}`}
                disabled={
                  !(
                    (selectTab === 'depart' && selectedSeatDepart) ||
                    (selectTab === 'return' && selectedSeatReturn)
                  )
                }
                onClick={handleBtn}
              >
                Next flight
              </Button>

              {selectedSeatDepart && selectedSeatReturn && (
                <Button
                  onClick={handleNavigate}
                  variant={'cancel'}
                  size={'cancel'}
                  className="w-[163px]"
                >
                  Payment Method
                </Button>
              )}
            </div>
          </div>

          {isOpenModal && <SelectModal onClose={() => setIsOpenModal(false)} />}
        </div>
      </div>
    </section>
  );
}
