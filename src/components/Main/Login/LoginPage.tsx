'use client';
import Image from 'next/image';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { DateRange } from 'react-day-picker';
import LoginCookies from './LoginCookies';

// import go from '@/app/assets/images/departure.svg';
// import arrive from '@/app/assets/images/arrival.svg';
// import calendar from '@/app/assets/images/calendar-with-dates.svg';
// import user from '@/app/assets/images/person-solid.svg';
// import bg from '@/app/assets/images/hero-login-bg.jpg';
import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';

import styles from './css/LoginPage.module.css';

export default function LoginPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const goOptions = ['SFO', 'ATL', 'LAX', 'STL', 'PVG', 'MSP', 'NRT', 'JFK'];
  const arriveOptions = ['NRT', 'PVG', 'STL', 'ATL', 'MSP', 'SFO', 'JFK', 'LAX'];
  const [tripType, setTripType] = useState<'round' | 'one'>('round');
  const [isCountOpen, setIsCountOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [minorCount, setMinorCount] = useState(0);
  const router = useRouter();

  const toggle = () => setIsCountOpen((prev) => !prev);
  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/detail');
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroTitleWrapper}>
          <h1 className={styles.heroTitle}>It’s more than just a trip</h1>
        </div>

        <form className={styles.searchForm}>
          {/* From */}
          <Select>
            <SelectTrigger className={styles.selectTriggerGo}>
              <SelectValue placeholder="From where?" />
            </SelectTrigger>
            <SelectContent className={styles.selectContent}>
              {goOptions.map((item, index) => (
                <SelectItem key={index} value={item} className={styles.selectItem}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* To */}
          <Select>
            <SelectTrigger className={styles.selectTriggerReturn}>
              <SelectValue placeholder="Where to?" />
            </SelectTrigger>
            <SelectContent className={styles.selectContent}>
              {arriveOptions.map((item, index) => (
                <SelectItem key={index} value={item} className={styles.selectItem}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Dates */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div onClick={() => setOpen(true)} className={styles.dateTrigger}>
                {dateRange?.from && dateRange?.to ? (
                  `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                ) : (
                  <span className={styles.placeholderText}>Depart - Return</span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className={styles.popoverContent} align="start">
              <form className={styles.popoverForm}>
                <label className={styles.radioLabel}>
                  <input
                    name="tripType"
                    type="radio"
                    value="round"
                    checked={tripType === 'round'}
                    onChange={() => setTripType('round')}
                  />
                  <span className={styles.radioText}>Round trip</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    name="tripType"
                    type="radio"
                    value="one"
                    checked={tripType === 'one'}
                    onChange={() => setTripType('one')}
                  />
                  <span className={styles.radioText}>One way</span>
                </label>
                <div onClick={() => setOpen(true)} className={styles.dateInput}>
                  {dateRange?.from && dateRange?.to ? (
                    `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                  ) : (
                    <span className={styles.placeholderText}>Depart - Return</span>
                  )}
                </div>
                <button className={styles.doneButton}>Done</button>
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

          {/* Passengers */}
          <div className={styles.passengerInput} onClick={toggle}>
            {adultCount} adult{adultCount > 1 ? 's' : ''}{' '}
            {minorCount > 0 ? `${minorCount} minor${minorCount > 1 ? 's' : ''}` : ''}
            {isCountOpen && (
              <div className={styles.passengerDropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.passengerRow}>
                  <span>Adults:</span>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      onClick={() => setAdultCount((prev) => Math.max(1, prev - 1))}
                    >
                      <Image src={decrement} alt="Decrement adult count" width={24} height={24} />
                    </button>
                    <span className={styles.counterText}>{adultCount}</span>
                    <button type="button" onClick={() => setAdultCount((prev) => prev + 1)}>
                      <Image src={increment} alt="Increment adult count" width={24} height={24} />
                    </button>
                  </div>
                </div>
                <div className={styles.passengerRow}>
                  <span>Minors:</span>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      onClick={() => setMinorCount((prev) => Math.max(0, prev - 1))}
                    >
                      <Image src={decrement} alt="Decrement minor count" width={24} height={24} />
                    </button>
                    <span className={styles.counterText}>{minorCount}</span>
                    <button type="button" onClick={() => setMinorCount((prev) => prev + 1)}>
                      <Image src={increment} alt="Increment minor count" width={24} height={24} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <Button onClick={handleNavigate} type="button" className={styles.searchBtn}>
            Search
          </Button>
        </form>

        <LoginCookies />
      </div>
    </section>
  );
}
