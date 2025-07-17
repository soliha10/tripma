'use client';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useFlight } from '@/context/FlightContext';

import increment from '@/app/[locale]/assets/images/Increment.svg';
import decrement from '@/app/[locale]/assets/images/inc.svg';
import styles from './css/OrderForm.module.css';

type OrderFormProps = {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  birthDate: string;
  setBirthDate: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  knownTraveller: string;
  setKnownTraveller: (value: string) => void;
};

export default function OrderForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthDate,
  setBirthDate,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  knownTraveller,
  setKnownTraveller,
}: OrderFormProps) {
  const [count, setCount] = useState(1);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const { setPassenger } = useFlight();

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPassenger({ firstName, lastName });
    router.push('/select-seat');
  };

  const isValid = firstName && lastName && birthDate && email && phoneNumber && knownTraveller;

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Passenger 1 (Adult)</h2>
      <form>
        <div className={styles.flexGroup}>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="First name*"
            className={styles.input}
            required
            aria-label="First name"
          />
          <Input placeholder="Middle" className={styles.input} aria-label="Middle name" />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Last name*"
            className={styles.input}
            required
            aria-label="Last name"
          />
          <Input placeholder="Suffix" className={styles.input} aria-label="Suffix" />

          <div className={styles.dateWrap}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button id="date" className={styles.dateBtn} aria-label="Select date of birth">
                  {date ? date.toLocaleDateString() : 'Date of birth*'}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    if (selectedDate) setBirthDate(selectedDate.toLocaleDateString());
                    setOpen(false);
                  }}
                  className={styles.calendar}
                />
              </PopoverContent>
            </Popover>
            <span className={styles.smallText}>MM/DD/YY</span>
          </div>
        </div>

        <div className={styles.flexGroup}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email address*"
            className={styles.w300}
            required
            aria-label="Email address"
          />
          <Input
            type="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Phone number*"
            className={styles.w300}
            required
            aria-label="Phone number"
          />
          <Input placeholder="Redress number" className={styles.w300} aria-label="Redress number" />
          <Input
            onChange={(e) => setKnownTraveller(e.target.value)}
            value={knownTraveller}
            placeholder="Known traveller number*"
            className={styles.w300}
            required
            aria-label="Known traveller number"
          />
        </div>
      </form>

      <h2 className={styles.sectionTitle}>Emergency contact information</h2>
      <form>
        <Label className={styles.label}>
          <Input
            className={styles.checkInput}
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            aria-label="Use same information as Passenger 1"
          />
          <span>Same as Passenger 1</span>
        </Label>

        <div className={styles.flexGroup}>
          <Input
            placeholder="First name*"
            className={styles.w300}
            value={isChecked ? firstName : ''}
            disabled={isChecked}
            aria-label="Emergency contact first name"
          />
          <Input
            placeholder="Last name*"
            className={styles.w300}
            value={isChecked ? lastName : ''}
            disabled={isChecked}
            aria-label="Emergency contact last name"
          />
          <Input
            placeholder="Email address*"
            className={styles.w300}
            value={isChecked ? email : ''}
            disabled={isChecked}
            aria-label="Emergency contact email address"
          />
          <Input
            placeholder="Phone number*"
            className={styles.w300}
            value={isChecked ? phoneNumber : ''}
            disabled={isChecked}
            aria-label="Emergency contact phone number"
          />
        </div>
      </form>

      <h2 className={styles.sectionTitle}>Bag information</h2>
      <p className={styles.policy}>
        Each passenger is allowed one free carry-on bag and one personal item. First checked bag for
        each passenger is also free. Second bag check fees are waived for loyalty program members.
        See the <span className={styles.policyHighlight}>full bag policy.</span>
      </p>

      <div className={styles.bagInfo}>
        <div className={styles.passengerInfo}>
          <strong className={styles.passengerTitle}>Passenger 1</strong>
          <span className={styles.passengerName}>
            {firstName} {lastName}
          </span>
        </div>

        <div className={styles.bagCountContainer}>
          <span className={styles.passengerTitle}>Checked bags</span>
          <div className={styles.bagCountWrap}>
            <Button
              className={styles.btnCount}
              type="button"
              onClick={() => setCount(count > 0 ? count - 1 : count)}
              aria-label="Decrease bag count"
            >
              <Image src={decrement} alt="Decrease" width={24} height={24} />
            </Button>
            <span className={styles.count}>{count}</span>
            <Button
              className={styles.btnCount}
              type="button"
              onClick={() => setCount(count + 1)}
              aria-label="Increase bag count"
            >
              <Image src={increment} alt="Increase" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button type="button" className={styles.btnPrimary} aria-label="Save and close">
          Save and Close
        </Button>
        <Button
          className={`${styles.btnSecondary} ${isValid ? styles.btnActive : styles.btnDisabled}`}
          disabled={!isValid}
          type="button"
          onClick={handleNavigate}
          aria-label="Proceed to select seats"
        >
          Select seats
        </Button>
      </div>
    </div>
  );
}
