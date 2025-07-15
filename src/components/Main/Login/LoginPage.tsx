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

import go from '@/app/assets/images/departure.svg';
import arrive from '@/app/assets/images/arrival.svg';
import calendar from '@/app/assets/images/calendar-with-dates.svg';
import user from '@/app/assets/images/person-solid.svg';
import bg from '@/app/assets/images/hero-login-bg.jpg';
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
    <section className={styles.heroSection} style={{ backgroundImage: `url(${bg.src})` }}>
      <div className={styles.container}>
        <div className={styles.heroTitleWrapper}>
          <h1 className={styles.heroTitle}>It’s more than just a trip</h1>
        </div>

        <form className={styles.searchForm}>
          {/* From */}
          <Select>
            <SelectTrigger
              className={styles.selectTrigger}
              style={{ backgroundImage: `url(${go.src})` }}
            >
              <SelectValue placeholder="From where?" />
            </SelectTrigger>
            <SelectContent className="rounded-[8px] w-[300px] h-[312px] ms-6 flex flex-col gap-2 bg-white p-4">
              {goOptions.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item}
                  className="hover:bg-[#605DEC] w-full mb-2 text-base focus:bg-[#605DEC] focus:text-white"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* To */}
          <Select>
            <SelectTrigger
              className={styles.selectTrigger}
              style={{ backgroundImage: `url(${arrive.src})` }}
            >
              <SelectValue placeholder="Where to?" />
            </SelectTrigger>
            <SelectContent className="rounded-[8px] w-[300px] h-[312px] ms-6 flex flex-col gap-2 bg-white p-4">
              {arriveOptions.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item}
                  className="hover:bg-[#605DEC] w-full mb-2 text-base focus:bg-[#605DEC] focus:text-white"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Dates */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                onClick={() => setOpen(true)}
                className={styles.dateTrigger}
                style={{ backgroundImage: `url(${calendar.src})` }}
              >
                {dateRange?.from && dateRange?.to ? (
                  `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                ) : (
                  <span className="text-[#7C8DB0]">Depart - Return</span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[626px] pb-8 px-0 overflow-hidden" align="start">
              <form className="flex pt-1 px-6 pb-5 items-center border-b border-[#CBD4E6]">
                <label className="me-3 flex items-center">
                  <input
                    name="tripType"
                    type="radio"
                    value="radio"
                    checked={tripType === 'round'}
                    onChange={() => setTripType('round')}
                  />
                  <span className="text-[#6E7491] text-sm ms-2">Round trip</span>
                </label>
                <label className="me-[46px] flex items-center">
                  <input
                    name="tripType"
                    type="radio"
                    value="one"
                    checked={tripType === 'one'}
                    onChange={() => setTripType('one')}
                  />
                  <span className="text-[#6E7491] text-sm ms-2">One way</span>
                </label>
                <div
                  onClick={() => setOpen(true)}
                  className="w-[252px] ps-[52px] border-2 me-2 py-2 pe-2 text-[#7C8DB0] text-[18px] rounded border-[#605DEC] cursor-pointer bg-white"
                  style={{
                    backgroundImage: `url(${calendar.src})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '32px',
                    backgroundPosition: '8px center',
                  }}
                >
                  {dateRange?.from && dateRange?.to ? (
                    `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
                  ) : (
                    <span className="text-[#7C8DB0]">Depart - Return</span>
                  )}
                </div>
                <button className="bg-[#605DEC] w-[84px] text-white text-[18px] py-3 rounded">
                  Done
                </button>
              </form>
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                numberOfMonths={2}
                selected={dateRange}
                onSelect={setDateRange}
                className="rounded-lg w-[480px] shadow-none px-0 pt-6 mx-auto"
              />
            </PopoverContent>
          </Popover>

          {/* Passengers */}
          <div
            className={styles.passengerInput}
            style={{ backgroundImage: `url(${user.src})` }}
            onClick={toggle}
          >
            {adultCount} adult{adultCount > 1 ? 's' : ''}{' '}
            {minorCount > 0 ? `${minorCount} minor` : ''}
            {isCountOpen && (
              <div className={styles.passengerDropdown} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-2">
                  <span>Adults:</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setAdultCount((prev) => Math.max(1, prev - 1))}
                    >
                      <Image src={decrement} alt="-" />
                    </button>
                    <span className="text-[18px]">{adultCount}</span>
                    <button type="button" onClick={() => setAdultCount((prev) => prev + 1)}>
                      <Image src={increment} alt="+" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Minors:</span>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setMinorCount((prev) => Math.max(0, prev - 1))}
                    >
                      <Image src={decrement} alt="-" />
                    </button>
                    <span className="text-[18px]">{minorCount}</span>
                    <button type="button" onClick={() => setMinorCount((prev) => prev + 1)}>
                      <Image src={increment} alt="+" />
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
