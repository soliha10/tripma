'use client';
import { useState, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl'; // Import useTranslations
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
  const t = useTranslations('OrderHero.OrderForm'); // Use the OrderForm namespace
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
      <h2 className={styles.sectionTitle}>{t('passenger1Adult')}</h2>
      <form>
        <div className={styles.flexGroup}>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder={t('firstNamePlaceholder')}
            className={styles.input}
            required
            aria-label={t('firstNameAria')}
          />
          <Input
            placeholder={t('middlePlaceholder')}
            className={styles.input}
            aria-label={t('middleNameAria')}
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder={t('lastNamePlaceholder')}
            className={styles.input}
            required
            aria-label={t('lastNameAria')}
          />
          <Input
            placeholder={t('suffixPlaceholder')}
            className={styles.input}
            aria-label={t('suffixAria')}
          />

          <div className={styles.dateWrap}>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button id="date" className={styles.dateBtn} aria-label={t('dateOfBirthAria')}>
                  {date ? date.toLocaleDateString() : t('dateOfBirth')}
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
            <span className={styles.smallText}>{t('dateFormat')}</span>
          </div>
        </div>

        <div className={styles.flexGroup}>
          <Input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder={t('emailPlaceholder')}
            className={styles.w300}
            required
            aria-label={t('emailAria')}
          />
          <Input
            type="tel"
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder={t('phoneNumberPlaceholder')}
            className={styles.w300}
            required
            aria-label={t('phoneNumberAria')}
          />
          <Input
            placeholder={t('redressNumberPlaceholder')}
            className={styles.w300}
            aria-label={t('redressNumberAria')}
          />
          <Input
            onChange={(e) => setKnownTraveller(e.target.value)}
            value={knownTraveller}
            placeholder={t('knownTravellerPlaceholder')}
            className={styles.w300}
            required
            aria-label={t('knownTravellerAria')}
          />
        </div>
      </form>

      <h2 className={styles.sectionTitle}>{t('emergencyContactTitle')}</h2>
      <form>
        <Label className={styles.label}>
          <Input
            className={styles.checkInput}
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            aria-label={t('sameAsPassenger1Aria')}
          />
          <span>{t('sameAsPassenger1')}</span>
        </Label>

        <div className={styles.flexGroup}>
          <Input
            placeholder={t('firstNamePlaceholder')}
            className={styles.w300}
            value={isChecked ? firstName : ''}
            disabled={isChecked}
            aria-label={t('emergencyFirstNameAria')}
          />
          <Input
            placeholder={t('lastNamePlaceholder')}
            className={styles.w300}
            value={isChecked ? lastName : ''}
            disabled={isChecked}
            aria-label={t('emergencyLastNameAria')}
          />
          <Input
            placeholder={t('emailPlaceholder')}
            className={styles.w300}
            value={isChecked ? email : ''}
            disabled={isChecked}
            aria-label={t('emergencyEmailAria')}
          />
          <Input
            placeholder={t('phoneNumberPlaceholder')}
            className={styles.w300}
            value={isChecked ? phoneNumber : ''}
            disabled={isChecked}
            aria-label={t('emergencyPhoneNumberAria')}
          />
        </div>
      </form>

      <h2 className={styles.sectionTitle}>{t('bagInformationTitle')}</h2>
      <p
        className={styles.policy}
        dangerouslySetInnerHTML={{
          __html: t
            .raw('bagPolicy')
            .replace(
              '<policyHighlight>full bag policy</policyHighlight>',
              `<span class="${styles.policyHighlight}">${t('fullBagPolicy')}</span>`,
            ),
        }}
      />

      <div className={styles.bagInfo}>
        <div className={styles.passengerInfo}>
          <strong className={styles.passengerTitle}>{t('passenger1Title')}</strong>
          <span className={styles.passengerName}>
            {firstName} {lastName}
          </span>
        </div>

        <div className={styles.bagCountContainer}>
          <span className={styles.passengerTitle}>{t('checkedBags')}</span>
          <div className={styles.bagCountWrap}>
            <Button
              className={styles.btnCount}
              type="button"
              onClick={() => setCount(count > 0 ? count - 1 : count)}
              aria-label={t('decreaseBagCountAria')}
            >
              <Image src={decrement} alt={t('decreaseAlt')} width={24} height={24} />
            </Button>
            <span className={styles.count}>{count}</span>
            <Button
              className={styles.btnCount}
              type="button"
              onClick={() => setCount(count + 1)}
              aria-label={t('increaseBagCountAria')}
            >
              <Image src={increment} alt={t('increaseAlt')} width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button type="button" className={styles.btnPrimary} aria-label={t('saveAndCloseAria')}>
          {t('saveAndClose')}
        </Button>
        <Button
          className={`${styles.btnSecondary} ${isValid ? styles.btnActive : styles.btnDisabled}`}
          disabled={!isValid}
          type="button"
          onClick={handleNavigate}
          aria-label={t('proceedToSelectSeatsAria')}
        >
          {t('selectSeats')}
        </Button>
      </div>
    </div>
  );
}
