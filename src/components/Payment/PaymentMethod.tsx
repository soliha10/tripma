'use client';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';
import card from '@/app/[locale]/assets/images/credit card.svg';
import googlePay from '@/app/[locale]/assets/images/google.svg';
import applePay from '@/app/[locale]/assets/images/apple.svg';
import paypal from '@/app/[locale]/assets/images/paypal.svg';
import crypto from '@/app/[locale]/assets/images/bitcoin money currency crypto.svg';
import Image from 'next/image';
import google from '@/app/[locale]/assets/images/color.svg';
import apple from '@/app/[locale]/assets/images/apple mac.svg';
import facebook from '@/app/[locale]/assets/images/facebook.svg';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Email from '../Main/Login/Email';
import { Button } from '../ui/button';
import SelectedItem from '../Details/DetailHero/SelectedItem';
import { useFlight } from '@/context/FlightContext';
import { MouseEvent, useState } from 'react';
import info from '@/app/[locale]/assets/images/information.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { useTranslations } from 'next-intl'; // Import useTranslations
import styles from './PaymentMethod.module.css';

export default function PaymentMethod() {
  const t = useTranslations('PaymentMethod'); // Use the PaymentMethod namespace
  const { selectedDepartFlight, selectedReturnFlight, priceCalculations, paymentInfo, setPaymentInfo } = useFlight();
  const { subtotal, taxesAndFees, total } = priceCalculations;

  const emails = [
    { id: 1, pic: google, text: t('socialLogin.google') },
    { id: 2, pic: apple, text: t('socialLogin.apple') },
    { id: 3, pic: facebook, text: t('socialLogin.facebook') },
  ];
  const payTypes = [
    { pic: card, name: t('payTypes.creditCard'), alt: t('creditCardAlt') },
    { pic: googlePay, name: t('payTypes.googlePay'), alt: t('googlePayAlt') },
    { pic: applePay, name: t('payTypes.applePay'), alt: t('applePayAlt') },
    { pic: paypal, name: t('payTypes.paypal'), alt: t('paypalAlt') },
    { pic: crypto, name: t('payTypes.crypto'), alt: t('cryptoAlt') },
  ];
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [checkedSave, setCheckedSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [cardExpireDate, setCardExpireDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Validation functions
  const validateCardName = (name: string): string => {
    if (!name.trim()) return 'Card name is required';
    if (name.trim().length < 2) return 'Card name must be at least 2 characters';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Card name can only contain letters and spaces';
    return '';
  };

  const validateCardNumber = (number: string): string => {
    const cleanNumber = number.replace(/\s/g, '');
    if (!cleanNumber) return 'Card number is required';
    if (!/^\d{16}$/.test(cleanNumber)) return 'Card number must be 16 digits';
    return '';
  };

  const validateCVV = (cvv: string): string => {
    if (!cvv) return 'CVV is required';
    if (!/^\d{3,4}$/.test(cvv)) return 'CVV must be 3 or 4 digits';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const validateCardExpiry = (date: Date | undefined): string => {
    if (!date) return 'Expiry date is required';
    const today = new Date();
    if (date < today) return 'Card has expired';
    return '';
  };

  // Handle input changes with validation
  const handleCardNameChange = (value: string) => {
    setCardName(value);
    const error = validateCardName(value);
    setErrors(prev => ({ ...prev, cardName: error }));
  };

  const handleCardNumberChange = (value: string) => {
    // Format card number with spaces
    const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
      const error = validateCardNumber(formatted);
      setErrors(prev => ({ ...prev, cardNumber: error }));
    }
  };

  const handleCVVChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) {
      setCardCVV(value);
      const error = validateCVV(value);
      setErrors(prev => ({ ...prev, cardCVV: error }));
    }
  };

  const handleEmailChange = (value: string) => {
    setAccountEmail(value);
    const error = validateEmail(value);
    setErrors(prev => ({ ...prev, email: error }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const error = validatePassword(value);
    setErrors(prev => ({ ...prev, password: error }));
  };

  const handleExpiryChange = (date: Date | undefined) => {
    setCardExpireDate(date);
    const error = validateCardExpiry(date);
    setErrors(prev => ({ ...prev, cardExpiry: error }));
  };

  const getPasswordStrength = () => {
    if (password.length >= 14) return 'Strong';
    if (password.length >= 8) return 'Weak';
    return 'Too short';
  };

  const strength = getPasswordStrength();
  const router = useRouter();

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Save payment info to global context
    if (cardName && cardNumber && cardExpireDate && cardCVV) {
      setPaymentInfo({
        cardName,
        cardNumber,
        cardExpiry: cardExpireDate.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }),
        cardCVV
      });
    }
    
    router.push('/summary');
  };

  return (
    <>
      <LoginHeader />
      <main>
        <section>
          <div className={styles.container}>
            <div className={styles.contentWrapper}>
              {/* Left side */}
              <div className={styles.leftSide}>
                <h2 className={styles.sectionTitle}>{t('sectionTitle')}</h2>
                <p className={styles.sectionDescription}>{t('sectionDescription')}</p>

                <ul className={styles.paymentOptions}>
                  {payTypes.map(({ pic, name, alt }, index) => (
                    <li key={index} className={styles.paymentOption}>
                      <Image src={pic} alt={alt} width={40} height={24} />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <h3 className={styles.subSectionTitle}>{t('creditCardDetailsTitle')}</h3>
                  <form>
                    <div className={styles.checkboxWrapper}>
                      <Input
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                        className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`}
                        aria-label={t('billingAddressAria')}
                      />
                      <Label className={styles.checkboxLabel}>{t('billingAddressCheckbox')}</Label>
                    </div>
                    <div>
                      <Input
                        placeholder={t('nameOnCardPlaceholder')}
                        value={cardName}
                        onChange={(e) => handleCardNameChange(e.target.value)}
                        className={`${styles.input} ${errors.cardName ? styles.inputError : ''}`}
                        aria-label={t('nameOnCardAria')}
                      />
                      {errors.cardName && <span className={styles.errorText}>{errors.cardName}</span>}
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder={t('cardNumberPlaceholder')}
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        className={`${styles.inputCard} ${errors.cardNumber ? styles.inputError : ''}`}
                        aria-label={t('cardNumberAria')}
                        maxLength={19}
                      />
                      {errors.cardNumber && <span className={styles.errorText}>{errors.cardNumber}</span>}
                    </div>
                    <div className={styles.cardDetailsWrapper}>
                      <div className={styles.expiryDateWrapper}>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="default"
                              id="date"
                              className={styles.expiryButton}
                              aria-label={t('expirationDateAria')}
                            >
                              {cardExpireDate
                                ? `${cardExpireDate.toLocaleString('default', {
                                    month: 'numeric',
                                    year: '2-digit',
                                  })}`
                                : t('expirationDate')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className={styles.popoverContent} align="start">
                            <Calendar
                              mode="single"
                              selected={cardExpireDate}
                              captionLayout="dropdown"
                              onSelect={(d) => {
                                handleExpiryChange(d);
                                setOpen(false);
                              }}
                              classNames={{
                                table: 'hidden',
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <span className={styles.expiryFormat}>{t('expiryFormat')}</span>
                        {errors.cardExpiry && <span className={styles.errorText}>{errors.cardExpiry}</span>}
                      </div>
                      <div>
                        <Input
                          placeholder={t('ccvPlaceholder')}
                          type="text"
                          value={cardCVV}
                          onChange={(e) => handleCVVChange(e.target.value)}
                          className={`${styles.ccvInput} ${errors.cardCVV ? styles.inputError : ''}`}
                          style={{
                            backgroundImage: `url(${info.src})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '32px 32px',
                            backgroundPosition: 'right 12px center',
                          }}
                          aria-label={t('ccvAria')}
                          maxLength={4}
                        />
                        {errors.cardCVV && <span className={styles.errorText}>{errors.cardCVV}</span>}
                      </div>
                    </div>
                  </form>
                </div>

                <div>
                  <h3 className={styles.subSectionTitle}>{t('createAccountTitle')}</h3>
                  <p className={styles.sectionDescription}>{t('createAccountDescription')}</p>
                  <form>
                    <div className={styles.checkboxWrapper}>
                      <Input
                        type="checkbox"
                        checked={checkedSave}
                        onChange={() => setCheckedSave(!checkedSave)}
                        className={`${styles.checkbox} ${checkedSave ? styles.checkboxChecked : ''}`}
                        aria-label={t('saveCardAria')}
                      />
                      <Label className={styles.checkboxLabel}>{t('saveCardCheckbox')}</Label>
                    </div>
                    <div>
                      <Input
                        placeholder={t('emailPlaceholder')}
                        type="email"
                        value={accountEmail}
                        onChange={(e) => handleEmailChange(e.target.value)}
                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        aria-label={t('emailAria')}
                      />
                      {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                    <div className={styles.passwordWrapper}>
                      <Input
                        placeholder={t('passwordPlaceholder')}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        className={`${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
                        aria-label={t('passwordAria')}
                      />
                      {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
                        role="button"
                        tabIndex={0}
                        aria-label={showPassword ? t('hidePasswordAria') : t('showPasswordAria')}
                      >
                        {showPassword ? (
                          <FiEyeOff className={styles.eyeIcon} />
                        ) : (
                          <FiEye className={styles.eyeIcon} />
                        )}
                      </div>
                      {password && (
                        <span
                          className={`${styles.passwordStrength} ${
                            strength === 'Strong'
                              ? styles.strong
                              : strength === 'Weak'
                                ? styles.weak
                                : styles.tooShort
                          }`}
                        >
                          {strength === 'Strong'
                            ? t('strongPassword')
                            : strength === 'Weak'
                              ? t('weakPassword')
                              : t('tooShortPassword')}
                        </span>
                      )}
                    </div>

                    <div className={styles.orDivider}>
                      <span className={styles.dividerLine}></span>
                      <span className={styles.orText}>{t('orDivider')}</span>
                      <span className={styles.dividerLine}></span>
                    </div>
                    <ul className={styles.socialLoginList}>
                      {emails.map(({ id, pic, text }) => (
                        <Email key={id} id={id} pic={pic} text={text} />
                      ))}
                    </ul>
                  </form>
                </div>

                <div>
                  <h3 className={styles.subSectionTitle}>{t('cancellationPolicyTitle')}</h3>
                  <p
                    className={styles.sectionDescription}
                    dangerouslySetInnerHTML={{
                      __html: t
                        .raw('cancellationPolicyDescription')
                        .replace(
                          '<link>full cancellation policy</link>',
                          `<a class="${styles.link}" href="/cancellation-policy">${t('fullCancellationPolicy')}</a>`,
                        ),
                    }}
                  />
                  <div className={styles.buttonWrapper}>
                    <Button
                      variant="cancel"
                      className={styles.backButton}
                      onClick={() => router.back()}
                      aria-label={t('backToSeatSelectionAria')}
                    >
                      {t('backToSeatSelect')}
                    </Button>
                    <Button
                      variant="upgrade"
                      className={`${styles.confirmButton} ${
                        cardName &&
                        cardNumber &&
                        cardExpireDate &&
                        cardCVV &&
                        accountEmail &&
                        password
                          ? ''
                          : styles.disabledButton
                      }`}
                      disabled={
                        !(
                          cardName &&
                          cardNumber &&
                          cardExpireDate &&
                          cardCVV &&
                          accountEmail &&
                          password
                        )
                      }
                      onClick={handleNavigate}
                      aria-label={t('confirmAndPayAria')}
                    >
                      {t('confirmAndPay')}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div className={styles.rightSide}>
                {selectedDepartFlight && (
                  <div className={styles.flightCard}>
                    <SelectedItem {...selectedDepartFlight} />
                  </div>
                )}
                {selectedReturnFlight && (
                  <div className={styles.flightCard}>
                    <SelectedItem {...selectedReturnFlight} />
                  </div>
                )}
                <div className={styles.priceSummary}>
                  <div className={styles.priceRow}>
                    <span>{t('subtotal')}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span>{t('taxesAndFees')}</span>
                    <span>${taxesAndFees.toFixed(2)}</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span>{t('total')}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  variant="upgrade"
                  className={`${styles.confirmButtonRight} ${
                    cardName && cardNumber && cardExpireDate && cardCVV && accountEmail && password
                      ? ''
                      : styles.disabledButton
                  }`}
                  disabled={
                    !(
                      cardName &&
                      cardNumber &&
                      cardExpireDate &&
                      cardCVV &&
                      accountEmail &&
                      password
                    )
                  }
                  onClick={handleNavigate}
                  aria-label={t('confirmAndPayAria')}
                >
                  {t('confirmAndPay')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
