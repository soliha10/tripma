'use client';
import arrow from '@/app/[locale]/assets/images/chevron-down.svg';

import Image, { StaticImageData } from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import { MouseEvent, useState } from 'react';
import { DateRange } from 'react-day-picker';

import go from '@/app/[locale]/assets/images/departure.svg';
import arrive from '@/app/[locale]/assets/images/arrival.svg';
import calendar from '@/app/[locale]/assets/images/calendar-with-dates.svg';
import user from '@/app/[locale]/assets/images/person-solid.svg';
import increment from '@/app/[locale]/assets/images/Increment.svg';
import decrement from '@/app/[locale]/assets/images/inc.svg';
import map from '@/app/[locale]/assets/images/Map.svg';
import { DepartingFlight } from './DepartingFlight';
import { Button } from '@/components/ui/button';
import Price from './Price';
import priceGraph from '@/app/[locale]/assets/images/Price History.svg';
import SelectedItem from './SelectedItem';
import { ReturningFlight } from './ReturningFlight';
import { useRouter } from 'next/navigation';
import { useFlight } from '@/context/FlightContext';
import { useTranslations } from 'next-intl';
import styles from './css/DetailHero.module.css';
export type Flight = {
  id: number;
  pic: StaticImageData;
  duration: string;
  airlineType: string;
  time: string;
  stop?: string;
  stopDuration: string;
  price: string;
  tripType: string;
};

export default function DetailHero() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const goOptions = ['SFO', 'ATL', 'LAX', 'STL', 'PVG', 'MSP', 'NRT', 'JFK'];
  const arriveOptions = ['NRT', 'PVG', 'STL', 'ATL', 'MSP', 'SFO', 'JFK', 'LAX'];
  const [tripType, setTripType] = useState<'round' | 'one'>('round');
  const [isCountOpen, setIsCountOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [minorCount, setMinorCount] = useState(0);

  const [state, setState] = useState<'departing' | 'returning'>('departing');
  const toggle = () => {
    setIsCountOpen((prev) => !prev);
  };

  const router = useRouter();

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/order');
  };

  const {
    selectedDepartFlight,
    selectedReturnFlight,
    setSelectedDepartFlight,
    setSelectedReturnFlight,
  } = useFlight();

  const t = useTranslations('DetailPage');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <form action="" className={styles.form}>
            {/* go */}
            <Select>
              <SelectTrigger
                className={styles.selectTrigger}
                style={{ backgroundImage: `url(${go.src})` }}
              >
                <SelectValue placeholder={t('selection.fromWhere')} />
              </SelectTrigger>
              <SelectContent className={styles.selectContent}>
                {goOptions.map((item, index) => (
                  <SelectItem key={index} value={item} className={styles.selectItem}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* arrive */}
            <Select>
              <SelectTrigger
                className={styles.selectTrigger}
                style={{ backgroundImage: `url(${arrive.src})` }}
              >
                <SelectValue placeholder={t('selection.toWhere')} />
              </SelectTrigger>
              <SelectContent className={styles.selectContent}>
                {arriveOptions.map((item, index) => (
                  <SelectItem key={index} value={item} className={styles.selectItem}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* date */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <div
                  onClick={() => setOpen(true)}
                  className={styles.datePopoverTrigger}
                  style={{ backgroundImage: `url(${calendar.src})` }}
                >
                  {dateRange?.from && dateRange?.to ? (
                    `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                  ) : (
                    <span>{t('selection.departReturn')}</span>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent className={styles.popoverContent} align="start">
                <form className={styles.radioForm}>
                  <label className={styles.roundOption}>
                    <input
                      name="tripType"
                      type="radio"
                      value="round"
                      checked={tripType === 'round'}
                      onChange={() => setTripType('round')}
                    />
                    <span className={styles.radioLabelText}>{t('selection.roundTrip')}</span>
                  </label>
                  <label className={styles.oneWayOption}>
                    <input
                      name="tripType"
                      type="radio"
                      value="one"
                      checked={tripType === 'one'}
                      onChange={() => setTripType('one')}
                    />
                    <span className={styles.radioLabelText}>{t('selection.oneWay')}</span>
                  </label>
                  <div
                    onClick={() => setOpen(true)}
                    className={styles.dateRangeBox}
                    style={{ backgroundImage: `url(${calendar.src})` }}
                  >
                    {dateRange?.from && dateRange?.to ? (
                      `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                    ) : (
                      <span>{t('selection.departReturn')}</span>
                    )}
                  </div>
                  <button
                    type="button"
                    className={styles.doneButton}
                    onClick={() => setOpen(false)}
                  >
                    {t('selection.done')}
                  </button>
                </form>
                <Calendar
                  mode="range"
                  defaultMonth={dateRange?.from}
                  numberOfMonths={2}
                  selected={dateRange}
                  onSelect={setDateRange}
                  className={styles.calendar}
                />
              </PopoverContent>
            </Popover>

            {/* count */}
            <div
              className={styles.passengerCount}
              style={{ backgroundImage: `url(${user.src})` }}
              onClick={toggle}
            >
              {adultCount} {t('selection.adults')}
              {adultCount > 1 ? t('selection.plural') : ''}{' '}
              {minorCount > 0 ? `${minorCount} ${t('selection.minors')}` : ''}
              {isCountOpen && (
                <div className={styles.counterDropdown} onClick={(e) => e.stopPropagation()}>
                  <div className={styles.counterRow}>
                    <span>{t('selection.adults')}</span>
                    <div className={styles.counterControls}>
                      <button
                        type="button"
                        onClick={() => setAdultCount((prev) => Math.max(1, prev - 1))}
                      >
                        <Image src={decrement} alt="Decrement" width={24} height={24} />
                      </button>
                      <span>{adultCount}</span>
                      <button type="button" onClick={() => setAdultCount((prev) => prev + 1)}>
                        <Image src={increment} alt="Increment" width={24} height={24} />
                      </button>
                    </div>
                  </div>
                  <div className={styles.counterRow}>
                    <span>{t('selection.minors')}:</span>
                    <div className={styles.counterControls}>
                      <button
                        type="button"
                        onClick={() => setMinorCount((prev) => Math.max(0, prev - 1))}
                      >
                        <Image src={decrement} alt="Decrement" width={24} height={24} />
                      </button>
                      <span>{minorCount}</span>
                      <button type="button" onClick={() => setMinorCount((prev) => prev + 1)}>
                        <Image src={increment} alt="Increment" width={24} height={24} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* search */}
            <button type="submit" className={styles.searchButton}>
              {t('selection.searchFlights')}
            </button>
          </form>

          <div className={styles.filterBar}>
            {[
              {
                placeholder: t('filters.maxPrice'),
                options: [t('filters.maxPrice'), t('filters.minPrice')],
                // width: '120px',
              },
              {
                placeholder: t('filters.shops'),
                options: [t('filters.shops'), t('filters.cafes')],
                width: '95px',
              },
              {
                placeholder: t('filters.times'),
                options: [t('filters.morning'), t('filters.afternoon')],
                width: '95px',
              },
              {
                placeholder: t('filters.airlines'),
                options: [t('filters.airline'), t('filters.airlines')],
                // width: '105px',
              },
              {
                placeholder: t('filters.seatClass'),
                options: [t('filters.seatClass'), t('filters.seatClasses')],
                // width: '123px',
              },
              {
                placeholder: t('filters.more'),
                options: [t('filters.more'), t('filters.school')],
              },
            ].map(({ placeholder, options }, idx) => (
              <Select key={idx}>
                <SelectTrigger
                  className={styles.selectMenuTrigger}
                  style={{
                    backgroundImage: `url(${arrow.src})`,
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '18px 18px',
                    // width,
                  }}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className={styles.selectGroup}>
                    {options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))}
          </div>

          <div className={styles.mainContent}>
            {/* LEFT SIDE */}
            <div className={styles.containerSelection}>
              {state === 'departing' && <DepartingFlight onSelect={setSelectedDepartFlight} />}
              {state === 'returning' && <ReturningFlight onSelect={setSelectedReturnFlight} />}

              <Button type="button" className={styles.button}>
                {t('selection.showAllFlights')}
              </Button>

              <Image
                src={map}
                alt="Flight map"
                width={872}
                height={300}
                className={styles.mapImage}
              />
            </div>

            {/* RIGHT SIDE */}
            <div
              className={`${styles.containerSelected} ${selectedDepartFlight ? styles.block : styles.hidden}`}
            >
              {selectedDepartFlight && (
                <div className={styles.box}>
                  <SelectedItem {...selectedDepartFlight} />
                </div>
              )}
              {selectedReturnFlight && (
                <div className={styles.box}>
                  <SelectedItem {...selectedReturnFlight} />
                </div>
              )}

              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span className={styles.label}>{t('priceInfo.subtotal')}</span>
                  <span>$503</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.label}>{t('priceInfo.taxesAndFees')}</span>
                  <span>$503</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.label}>{t('priceInfo.total')}</span>
                  <span>$503</span>
                </div>
              </div>

              {selectedDepartFlight && state === 'departing' && (
                <Button
                  onClick={() => setState('returning')}
                  className={styles.button}
                  style={{ width: '180px' }}
                >
                  {t('selection.saveAndClose')}
                </Button>
              )}
              {selectedReturnFlight && state === 'returning' && (
                <Button
                  onClick={handleNavigate}
                  className={styles.button}
                  style={{ width: '222px' }}
                >
                  {t('selection.passengerInfo')}
                </Button>
              )}
            </div>

            <div
              className={`${styles.containerInfo} ${selectedDepartFlight ? styles.hidden : styles.block}`}
            >
              <Price />

              <div className={styles.mb10}>
                <strong className={styles.title}>{t('priceInfo.priceHistory')}</strong>
                <Image
                  src={priceGraph}
                  alt="Price history graph"
                  width={400}
                  height={200}
                  className={styles.priceGraph}
                />
              </div>

              <div>
                <strong className={styles.ratingTitle}>{t('priceInfo.priceRating')}</strong>
                <span className={styles.ratingTag}>{t('priceInfo.buySoon')}</span>

                <p className={styles.description}>{t('priceInfo.priceDescription')}</p>
                <p className={styles.secondaryText}>{t('priceInfo.analysisNote')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
