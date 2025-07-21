'use client';
import Image from 'next/image';
import { MouseEvent, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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

import increment from '@/app/[locale]/assets/images/Increment.svg';
import decrement from '@/app/[locale]/assets/images/inc.svg';

import styles from './css/LoginPage.module.css';

export default function LoginPage() {
  const t = useTranslations('HomePage.SearchForm');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const goOptions = ['SFO', 'ATL', 'LAX', 'STL', 'PVG', 'MSP', 'NRT', 'JFK'];
  const arriveOptions = ['NRT', 'PVG', 'STL', 'ATL', 'MSP', 'SFO', 'JFK', 'LAX'];
  const [tripType, setTripType] = useState<'round' | 'one'>('round');
  const [isCountOpen, setIsCountOpen] = useState(false);
  const [adultCount, setAdultCount] = useState(1);
  const [minorCount, setMinorCount] = useState(0);
  const router = useRouter();
  const passengerRef = useRef<HTMLDivElement>(null);

  // Tashqariga bosilganda dropdown yopish
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setIsCountOpen(false);
      }
    };

    if (isCountOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCountOpen]);

  const toggle = () => setIsCountOpen((prev) => !prev);
  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/detail');
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.heroTitleWrapper}>
          <h1 className={styles.heroTitle}>{t('title') || "It's more than just a trip"}</h1>
        </div>

        <form className={styles.searchForm}>
          {/* From */}
          <Select>
            <SelectTrigger className={styles.selectTriggerGo}>
              <SelectValue placeholder={t('fromWhere')} />
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
              <SelectValue placeholder={t('toWhere')} />
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
                  <span className={styles.placeholderText}>{t('departReturn')}</span>
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
                  <span className={styles.radioText}>{t('roundTrip')}</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    name="tripType"
                    type="radio"
                    value="one"
                    checked={tripType === 'one'}
                    onChange={() => setTripType('one')}
                  />
                  <span className={styles.radioText}>{t('oneWay')}</span>
                </label>
                <div onClick={() => setOpen(true)} className={styles.dateInput}>
                  {dateRange?.from && dateRange?.to ? (
                    `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                  ) : (
                    <span className={styles.placeholderText}>{t('departReturn')}</span>
                  )}
                </div>
                <button className={styles.doneButton}>{t('done') || 'Done'}</button>
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
          <div
            ref={passengerRef}
            className={`${styles.passengerInput} ${minorCount > 0 ? 'w-fit' : 'w-[200px]'}`}
            onClick={toggle}
          >
            {adultCount} {t('adults')}
            {adultCount > 1 ? t('plural') : ''}{' '}
            {minorCount > 0
              ? `${minorCount} ${t('minors')}${minorCount > 1 ? t('plural') : ''}`
              : ''}
            {isCountOpen && (
              <div className={styles.passengerDropdown} onClick={(e) => e.stopPropagation()}>
                <div className={styles.passengerRow}>
                  <span>{t('adults')}:</span>
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
                  <span>{t('minors')}:</span>
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
            {t('searchFlights')}
          </Button>
        </form>

        <LoginCookies />
      </div>
    </section>
  );
}
