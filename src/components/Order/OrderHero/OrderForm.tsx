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

import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';
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
            placeholder="First name*"
            className={styles.input}
            required
          />
          <Input placeholder="Middle" className={styles.input} />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name*"
            className={styles.input}
            required
          />
          <Input placeholder="Suffix" className={styles.input} />

          <div className={styles.dateWrap}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button id="date" className={styles.dateBtn}>
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
            placeholder="Email address*"
            className={styles.w300}
            required
          />
          <Input
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number*"
            className={styles.w300}
            required
          />
          <Input placeholder="Redress number" className={styles.w300} />
          <Input
            onChange={(e) => setKnownTraveller(e.target.value)}
            placeholder="Known traveller number*"
            className={styles.w300}
            required
          />
        </div>
      </form>

      <h2 className={styles.sectionTitle}>Emergency contact information</h2>
      <form>
        <Label className={styles.label}>
          <Input className={styles.checkInput} type="checkbox" onClick={() => setIsChecked(true)} />
          <span>Same as Passenger 1</span>
        </Label>

        <div className={styles.flexGroup}>
          <Input
            placeholder="First name*"
            className={styles.w300}
            value={isChecked ? firstName : ''}
          />
          <Input
            placeholder="Last name*"
            className={styles.w300}
            value={isChecked ? lastName : ''}
          />
          <Input
            placeholder="Email address*"
            className={styles.w300}
            value={isChecked ? email : ''}
          />
          <Input
            placeholder="Phone number*"
            className={styles.w300}
            value={isChecked ? phoneNumber : ''}
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

        <div>
          <span className={styles.passengerTitle}>Checked bags</span>
          <div className={styles.bagCountWrap}>
            <Button
              className={styles.btnCount}
              type="button"
              onClick={() => setCount(count > 1 ? count - 1 : count)}
            >
              <Image src={decrement} alt="minus" />
            </Button>
            <span className={styles.count}>{count}</span>
            <Button className={styles.btnCount} type="button" onClick={() => setCount(count + 1)}>
              <Image src={increment} alt="add" />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button className={styles.btnPrimary}>Save and Close</Button>
        <Button
          className={`${styles.btnSecondary} ${isValid ? styles.btnActive : styles.btnDisabled}`}
          disabled={!isValid}
          type="button"
          onClick={handleNavigate}
        >
          Select seats
        </Button>
      </div>
    </div>
  );
}
