'use client';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';
import card from '@/app/assets/images/credit card.svg';
import googlePay from '@/app/assets/images/google.svg';
import applePay from '@/app/assets/images/apple.svg';
import paypal from '@/app/assets/images/paypal.svg';
import crypto from '@/app/assets/images/bitcoin money currency crypto.svg';
import Image from 'next/image';
import google from '@/app/assets/images/color.svg';
import apple from '@/app/assets/images/apple mac.svg';
import facebook from '@/app/assets/images/facebook.svg';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Email from '../Main/Login/Email';
import { Button } from '../ui/button';
import SelectedItem from '../Details/DetailHero/SelectedItem';
import { useFlight } from '@/context/FlightContext';
import { MouseEvent, useState } from 'react';
import info from '@/app/assets/images/information.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import styles from './PaymentMethod.module.css';

export default function PaymentMethod() {
  const { selectedDepartFlight, selectedReturnFlight } = useFlight();

  const emails = [
    { id: 1, pic: google, text: 'Continue with Google' },
    { id: 2, pic: apple, text: 'Continue with Apple' },
    { id: 3, pic: facebook, text: 'Continue with Facebook' },
  ];
  const payTypes = [
    { pic: card, name: 'Credit card' },
    { pic: googlePay, name: 'Google Pay' },
    { pic: applePay, name: 'Apple pay' },
    { pic: paypal, name: 'Paypal' },
    { pic: crypto, name: 'Crypto' },
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

  const getPasswordStrength = () => {
    if (password.length >= 14) return 'Strong';
    if (password.length >= 8) return 'Weak';
    return 'Too short';
  };

  const strength = getPasswordStrength();
  const router = useRouter();

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
                <h2 className={styles.sectionTitle}>Payment method</h2>
                <p className={styles.sectionDescription}>
                  Select a payment method below. Tripma processes your payment securely with
                  end-to-end encryption.
                </p>

                <ul className={styles.paymentOptions}>
                  {payTypes.map(({ pic, name }, index) => (
                    <li key={index} className={styles.paymentOption}>
                      <Image src={pic} alt={name} />
                      <span>{name}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <h3 className={styles.subSectionTitle}>Credit card details</h3>
                  <form>
                    <div className={styles.checkboxWrapper}>
                      <Input
                        type="checkbox"
                        checked={checked}
                        onClick={() => setChecked(!checked)}
                        className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ''}`}
                      />
                      <Label className={styles.checkboxLabel}>
                        Billing address is same as Passenger 1
                      </Label>
                    </div>
                    <Input
                      placeholder="Name on card"
                      className={styles.input}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Card number"
                      onChange={(e) => setCardNumber(e.target.value)}
                      className={styles.inputCard}
                    />
                    <div className={styles.cardDetailsWrapper}>
                      <div className={styles.expiryDateWrapper}>
                        <Popover open={open} onOpenChange={setOpen}>
                          <PopoverTrigger asChild>
                            <Button variant="default" id="date" className={styles.expiryButton}>
                              {cardExpireDate
                                ? `${cardExpireDate.toLocaleString('default', {
                                    month: 'numeric',
                                    year: '2-digit',
                                  })}`
                                : 'Expiration date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className={styles.popoverContent} align="start">
                            <Calendar
                              mode="single"
                              selected={cardExpireDate}
                              captionLayout="dropdown"
                              onSelect={(d) => {
                                setCardExpireDate(d);
                                setOpen(false);
                              }}
                              classNames={{
                                table: 'hidden',
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                        <span className={styles.expiryFormat}>MM/YY</span>
                      </div>
                      <Input
                        min={0}
                        placeholder="CCV"
                        type="number"
                        onChange={(e) => setCardCVV(e.target.value)}
                        className={styles.ccvInput}
                        style={{
                          backgroundImage: `url(${info.src})`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '32px 32px',
                          backgroundPosition: 'right 12px center',
                        }}
                      />
                    </div>
                  </form>
                </div>

                <div>
                  <h3 className={styles.subSectionTitle}>Create an account</h3>
                  <p className={styles.sectionDescription}>
                    Tripma is free to use as a guest, but if you create an account today, you can
                    save and view flights, manage your trips, earn rewards, and more.
                  </p>
                  <form>
                    <div className={styles.checkboxWrapper}>
                      <Input
                        type="checkbox"
                        checked={checkedSave}
                        onClick={() => setCheckedSave(!checkedSave)}
                        className={`${styles.checkbox} ${checkedSave ? styles.checkboxChecked : ''}`}
                      />
                      <Label className={styles.checkboxLabel}>
                        Save card and create account for later
                      </Label>
                    </div>
                    <Input
                      placeholder="Email address or phone number"
                      type="email"
                      onChange={(e) => setAccountEmail(e.target.value)}
                      className={styles.input}
                    />
                    <div className={styles.passwordWrapper}>
                      <Input
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        className={styles.passwordInput}
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
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
                            ? 'Strong password'
                            : strength === 'Weak'
                              ? 'Weak password'
                              : 'Password must be at least 8 characters'}
                        </span>
                      )}
                    </div>

                    <div className={styles.orDivider}>
                      <span className={styles.dividerLine}></span>
                      <span className={styles.orText}>or</span>
                      <span className={styles.dividerLine}></span>
                    </div>
                    <ul className={styles.socialLoginList}>
                      {emails.map(({ id, pic, text }) => (
                        <Email key={id} pic={pic} text={text} id={id} />
                      ))}
                    </ul>
                  </form>
                </div>

                <div>
                  <h3 className={styles.subSectionTitle}>Cancellation policy</h3>
                  <p className={styles.sectionDescription}>
                    This flight has a flexible cancellation policy. If you cancel or change your
                    flight up to 30 days before the departure date, you are eligible for a free
                    refund. All flights booked on Tripma are backed by our satisfaction guarantee,
                    however cancellation policies vary by airline. See the
                    <a className={styles.link} href="">
                      {''}
                      full cancellation policy
                      {''}
                    </a>
                    for this flight.
                  </p>
                  <div className={styles.buttonWrapper}>
                    <Button variant={'cancel'} className={styles.backButton}>
                      Back to seat select
                    </Button>
                    <Button
                      variant={'upgrade'}
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
                    >
                      Confirm and pay
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
                    <span>Subtotal</span>
                    <span>$503</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span>Taxes and Fees</span>
                    <span>$503</span>
                  </div>
                  <div className={styles.priceRow}>
                    <span>Total</span>
                    <span>$503</span>
                  </div>
                </div>
                <Button
                  variant={'upgrade'}
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
                >
                  Confirm and pay
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
