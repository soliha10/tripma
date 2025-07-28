'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
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
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  birthDate: string;
  setBirthDate: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  knownTraveller: string;
  setKnownTraveller: React.Dispatch<React.SetStateAction<string>>;
  onValidationChange: React.Dispatch<React.SetStateAction<boolean>>;
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
  onValidationChange,
}: OrderFormProps) {
  const t = useTranslations('OrderHero.OrderForm');
  const [count, setCount] = useState(0);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const isValid =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      birthDate.trim() !== '' &&
      email.trim() !== '' &&
      phoneNumber.trim() !== '';

    setFormIsValid(isValid);
    onValidationChange(isValid);
  }, [firstName, lastName, birthDate, email, phoneNumber, onValidationChange]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emergencyFirstName, setEmergencyFirstName] = useState('');
  const [emergencyLastName, setEmergencyLastName] = useState('');
  const [emergencyEmail, setEmergencyEmail] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[+]?[1-9][\d]{0,2}[\s-]?[(]?[\d]{1,3}[)]?[\s-]?[\d]{3,4}[\s-]?[\d]{3,4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName || !validateName(firstName)) {
      newErrors.firstName = t('errors.firstName');
    }
    if (!lastName || !validateName(lastName)) {
      newErrors.lastName = t('errors.lastName');
    }
    if (!birthDate) {
      newErrors.birthDate = t('errors.birthDate');
    }
    if (!email || !validateEmail(email)) {
      newErrors.email = t('errors.email');
    }
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      newErrors.phoneNumber = t('errors.phone');
    }

    if (!isChecked) {
      if (!emergencyFirstName || !validateName(emergencyFirstName)) {
        newErrors.emergencyFirstName = t('errors.emergencyFirstName');
      }
      if (!emergencyLastName || !validateName(emergencyLastName)) {
        newErrors.emergencyLastName = t('errors.emergencyLastName');
      }
      if (!emergencyEmail || !validateEmail(emergencyEmail)) {
        newErrors.emergencyEmail = t('errors.emergencyEmail');
      }
      if (!emergencyPhone || !validatePhoneNumber(emergencyPhone)) {
        newErrors.emergencyPhone = t('errors.emergencyPhone');
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  const router = useRouter();
  const { setPassenger } = useFlight();

  useEffect(() => {
    const formIsValid = Boolean(
      firstName &&
        lastName &&
        birthDate &&
        email &&
        phoneNumber &&
        knownTraveller &&
        (isChecked ||
          (emergencyFirstName && emergencyLastName && emergencyEmail && emergencyPhone)),
    );
    onValidationChange(formIsValid);
  }, [
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    knownTraveller,
    isChecked,
    emergencyFirstName,
    emergencyLastName,
    emergencyEmail,
    emergencyPhone,
    onValidationChange,
  ]);

  const handleNavigate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formIsValid = validateForm();
    onValidationChange(formIsValid);

    if (formIsValid) {
      setPassenger({
        firstName,
        lastName,
        birthDate,
        email,
        phoneNumber,
        knownTraveller,
        emergencyContact: isChecked
          ? {
              firstName,
              lastName,
              email,
              phone: phoneNumber,
            }
          : {
              firstName: emergencyFirstName,
              lastName: emergencyLastName,
              email: emergencyEmail,
              phone: emergencyPhone,
            },
      });

      router.push('/select-seat');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>{t('passenger1Adult')}</h2>
      <form>
        <div className={styles.flexGroup}>
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => {
                if (firstName && !validateName(firstName)) {
                  setErrors((prev) => ({
                    ...prev,
                    firstName: 'First name must be at least 2 characters and contain only letters',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, firstName: '' }));
                }
              }}
              value={firstName}
              placeholder={t('firstNamePlaceholder')}
              className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
              required
              aria-label={t('firstNameAria')}
            />
            {errors.firstName && <span className={styles.errorText}>{errors.firstName}</span>}
          </div>
          <Input
            placeholder={t('middlePlaceholder')}
            className={styles.input}
            aria-label={t('middleNameAria')}
          />
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => {
                if (lastName && !validateName(lastName)) {
                  setErrors((prev) => ({
                    ...prev,
                    lastName: 'Last name must be at least 2 characters and contain only letters',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, lastName: '' }));
                }
              }}
              value={lastName}
              placeholder={t('lastNamePlaceholder')}
              className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
              required
              aria-label={t('lastNameAria')}
            />
            {errors.lastName && <span className={styles.errorText}>{errors.lastName}</span>}
          </div>
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
                    if (selectedDate) {
                      setBirthDate(selectedDate.toISOString().split('T')[0]);
                      setErrors((prev) => ({ ...prev, birthDate: '' }));
                    }
                    setOpen(false);
                  }}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  className={styles.calendar}
                />
              </PopoverContent>
            </Popover>
            <span className={styles.smallText}>{t('dateFormat')}</span>
          </div>
        </div>

        <div className={styles.flexGroup}>
          <div className={styles.inputWrapper}>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (email && !validateEmail(email)) {
                  setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
                } else {
                  setErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
              value={email}
              placeholder={t('emailPlaceholder')}
              className={`${styles.w300} ${errors.email ? styles.inputError : ''}`}
              required
              aria-label={t('emailAria')}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type="tel"
              onChange={(e) => setPhoneNumber(e.target.value)}
              onBlur={() => {
                if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
                  setErrors((prev) => ({
                    ...prev,
                    phoneNumber: 'Please enter a valid phone number',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                }
              }}
              value={phoneNumber}
              placeholder={t('phoneNumberPlaceholder')}
              className={`${styles.w300} ${errors.phoneNumber ? styles.inputError : ''}`}
              required
              aria-label={t('phoneNumberAria')}
            />
            {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber}</span>}
          </div>
          <Input
            placeholder={t('redressNumberPlaceholder')}
            className={styles.w300}
            aria-label={t('redressNumberAria')}
          />
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) => setKnownTraveller(e.target.value)}
              value={knownTraveller}
              placeholder={t('knownTravellerPlaceholder')}
              className={`${styles.w300} ${errors.knownTraveller ? styles.inputError : ''}`}
              required
              aria-label={t('knownTravellerAria')}
            />
          </div>
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
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) => setEmergencyFirstName(e.target.value)}
              onBlur={() => {
                if (!isChecked && emergencyFirstName && !validateName(emergencyFirstName)) {
                  setErrors((prev) => ({
                    ...prev,
                    emergencyFirstName: 'Emergency first name must be valid',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, emergencyFirstName: '' }));
                }
              }}
              value={isChecked ? firstName : emergencyFirstName}
              placeholder={t('firstNamePlaceholder')}
              className={`${styles.w300} ${errors.emergencyFirstName ? styles.inputError : ''}`}
              disabled={isChecked}
              required={!isChecked}
              aria-label={t('emergencyFirstNameAria')}
            />
            {errors.emergencyFirstName && (
              <span className={styles.errorText}>{errors.emergencyFirstName}</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              onChange={(e) => setEmergencyLastName(e.target.value)}
              onBlur={() => {
                if (!isChecked && emergencyLastName && !validateName(emergencyLastName)) {
                  setErrors((prev) => ({
                    ...prev,
                    emergencyLastName: 'Emergency last name must be valid',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, emergencyLastName: '' }));
                }
              }}
              value={isChecked ? lastName : emergencyLastName}
              placeholder={t('lastNamePlaceholder')}
              className={`${styles.w300} ${errors.emergencyLastName ? styles.inputError : ''}`}
              disabled={isChecked}
              required={!isChecked}
              aria-label={t('emergencyLastNameAria')}
            />
            {errors.emergencyLastName && (
              <span className={styles.errorText}>{errors.emergencyLastName}</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type="email"
              onChange={(e) => setEmergencyEmail(e.target.value)}
              onBlur={() => {
                if (!isChecked && emergencyEmail && !validateEmail(emergencyEmail)) {
                  setErrors((prev) => ({
                    ...prev,
                    emergencyEmail: 'Please enter a valid emergency email',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, emergencyEmail: '' }));
                }
              }}
              value={isChecked ? email : emergencyEmail}
              placeholder={t('emailPlaceholder')}
              className={`${styles.w300} ${errors.emergencyEmail ? styles.inputError : ''}`}
              disabled={isChecked}
              required={!isChecked}
              aria-label={t('emergencyEmailAria')}
            />
            {errors.emergencyEmail && (
              <span className={styles.errorText}>{errors.emergencyEmail}</span>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type="tel"
              onChange={(e) => setEmergencyPhone(e.target.value)}
              onBlur={() => {
                if (!isChecked && emergencyPhone && !validatePhoneNumber(emergencyPhone)) {
                  setErrors((prev) => ({
                    ...prev,
                    emergencyPhone: 'Please enter a valid emergency phone number',
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, emergencyPhone: '' }));
                }
              }}
              value={isChecked ? phoneNumber : emergencyPhone}
              placeholder={t('phoneNumberPlaceholder')}
              className={`${styles.w300} ${errors.emergencyPhone ? styles.inputError : ''}`}
              disabled={isChecked}
              required={!isChecked}
              aria-label={t('emergencyPhoneNumberAria')}
            />
            {errors.emergencyPhone && (
              <span className={styles.errorText}>{errors.emergencyPhone}</span>
            )}
          </div>
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
          className={`${styles.btnSecondary} ${formIsValid ? styles.btnActive : styles.btnDisabled}`}
          disabled={!formIsValid}
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
