'use client';
import Image from 'next/image';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';
import close from '@/app/[locale]/assets/images/close-summary.svg';
import { useState } from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations
import { useFlight } from '@/context/FlightContext';
import SelectedSeatsSummary from './SelectedSeatsSummary';
import visa from '@/app/[locale]/assets/images/visa.svg';
import map from '@/app/[locale]/assets/images/map-summary.svg';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ryokan from '@/app/[locale]/assets/images/ryokan.png';
import bessho from '@/app/[locale]/assets/images/bessho.png';
import hotel from '@/app/[locale]/assets/images/hotel.png';
import hours from '@/app/[locale]/assets/images/hours.png';
import nihon from '@/app/[locale]/assets/images/nihon.png';
import teamlab from '@/app/[locale]/assets/images/teamlab.png';
import SummaryCard from './SummaryCard';
import styles from './css/SummaryPage.module.css';

export default function SummaryPage() {
  const t = useTranslations('SummaryPage');
  const [isOpen, setIsOpen] = useState(true);
  const { 
    selectedDepartFlight, 
    selectedReturnFlight, 
    priceCalculations, 
    paymentInfo, 
    isUpgraded 
  } = useFlight();
  
  const { subtotal, taxesAndFees, total } = priceCalculations;

  const shopItems = [
    {
      id: 1,
      pic: ryokan,
      name: t('shopItems.ryokanJapan.name'),
      price: '$439',
      text: t('shopItems.ryokanJapan.text'),
      alt: t('shopItems.ryokanJapan.alt'),
    },
    {
      id: 2,
      pic: bessho,
      name: t('shopItems.besshoSasa.name'),
      price: '$529',
      text: t('shopItems.besshoSasa.text'),
      alt: t('shopItems.besshoSasa.alt'),
    },
    {
      id: 3,
      pic: hotel,
      name: t('shopItems.hotelOsaka.name'),
      price: '$139',
      text: t('shopItems.hotelOsaka.text'),
      alt: t('shopItems.hotelOsaka.alt'),
    },
    {
      id: 4,
      pic: hours,
      name: t('shopItems.nineHoursShinjuku.name'),
      price: '$59',
      text: t('shopItems.nineHoursShinjuku.text'),
      alt: t('shopItems.nineHoursShinjuku.alt'),
    },
  ];

  const experienceitems = [
    {
      id: 1,
      pic: nihon,
      name: t('experienceItems.nihonKimono.name'),
      price: '$89',
      text: t('experienceItems.nihonKimono.text'),
      alt: t('experienceItems.nihonKimono.alt'),
    },
    {
      id: 2,
      pic: teamlab,
      name: t('experienceItems.teamlabBorderless.name'),
      price: '$39',
      text: t('experienceItems.teamlabBorderless.text'),
      alt: t('experienceItems.teamlabBorderless.alt'),
    },
  ];

  return (
    <>
      <LoginHeader />

      <main>
        <section>
          <div className="max-w-[1342px] w-full mx-auto px-5">
            <div className={styles.summaryWrapper}>
              {/* left side */}
              <div className={styles.container}>
                {isOpen && (
                  <div className={styles.successMessage}>
                    <span>{t('successMessage')}</span>
                    <Image
                      src={close}
                      alt={t('closeAlt')}
                      onClick={() => setIsOpen(false)}
                      className={styles.closeIcon}
                      width={24}
                      height={24}
                    />
                  </div>
                )}

                <h1 className={styles.mainTitle}>{t('mainTitle')}</h1>
                <span className={styles.confirmationNumber}>{t('confirmationNumber')}</span>
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: t
                      .raw('description')
                      .replace(
                        '<link>My trips</link>',
                        `<a href="/my-trips" class="${styles.link}">${t('myTripsLink')}</a>`,
                      ),
                  }}
                />

                <h2 className={styles.sectionTitle}>{t('flightSummaryTitle')}</h2>

                <p className={styles.flightDate}>{t('departingDate')}</p>
                {selectedDepartFlight && (
                  <div className={styles.flightCard}>
                    <SelectedSeatsSummary {...selectedDepartFlight} />
                  </div>
                )}
                <span className={styles.seatInfo}>
                  {isUpgraded ? t('upgradedSeatInfo') : t('departingSeatInfo')}
                  {isUpgraded && <span className={styles.upgradeBadge}>{t('upgradedBadge')}</span>}
                </span>

                <p className={styles.flightDate}>{t('arrivingDate')}</p>
                {selectedReturnFlight && (
                  <div className={styles.flightCard}>
                    <SelectedSeatsSummary {...selectedReturnFlight} />
                  </div>
                )}
                <span className={styles.seatInfo}>
                  {isUpgraded ? t('upgradedSeatInfo') : t('arrivingSeatInfo')}
                  {isUpgraded && <span className={styles.upgradeBadge}>{t('upgradedBadge')}</span>}
                </span>

                <Table className={styles.priceTable}>
                  <TableCaption className={styles.tableCaption}>
                    {t('priceBreakdownCaption')}
                  </TableCaption>
                  <TableBody className={styles.tableBody}>
                    <TableRow className={styles.tableRow}>
                      <TableCell>{t('departingFlight')}</TableCell>
                      <TableCell>{selectedDepartFlight ? selectedDepartFlight.price : '$0.00'}</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>{t('arrivingFlight')}</TableCell>
                      <TableCell>{selectedReturnFlight ? selectedReturnFlight.price : '$0.00'}</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>{t('baggageFees')}</TableCell>
                      <TableCell>$0.00</TableCell>
                    </TableRow>
                    {isUpgraded && (
                      <TableRow className={styles.tableRow}>
                        <TableCell>{t('seatUpgrade')}</TableCell>
                        <TableCell>+$150.00</TableCell>
                      </TableRow>
                    )}
                    <TableRow className={styles.tableRow}>
                      <TableCell>{t('subtotal')}</TableCell>
                      <TableCell>${subtotal.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>{t('taxes')}</TableCell>
                      <TableCell>${taxesAndFees.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter className={styles.tableFooter}>
                    <TableRow className={styles.footerRow}>
                      <TableCell>{t('amountPaid')}</TableCell>
                      <TableCell>${total.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <h2 className={styles.sectionTitle}>{t('paymentMethodTitle')}</h2>
                <div className={styles.paymentCard}>
                  <Image
                    src={visa}
                    alt={t('visaAlt')}
                    className={styles.visaImage}
                    width={60}
                    height={38}
                  />
                  <strong className={styles.cardName}>{paymentInfo?.cardName || 'Sophia Knowles'}</strong>
                  <div className={styles.cardDetails}>
                    <span className={styles.cardNumber}>
                      ••••••••••••<span className={styles.cardLastFour}>
                        {paymentInfo?.cardNumber ? paymentInfo.cardNumber.slice(-4) : '3456'}
                      </span>
                    </span>
                    <span>{paymentInfo?.cardExpiry || '10/23'}</span>
                  </div>
                </div>

                <h2 className={styles.sectionTitle}>{t('shareItineraryTitle')}</h2>
                <p className={styles.description}>{t('shareItineraryDescription')}</p>
                <form action="" className={styles.form}>
                  <Input
                    placeholder={t('emailPlaceholder')}
                    className={styles.input}
                    aria-label={t('emailPlaceholder')}
                  />
                  <Input
                    placeholder={t('emailPlaceholder')}
                    className={styles.input}
                    aria-label={t('emailPlaceholder')}
                  />
                  <Input
                    placeholder={t('emailPlaceholder')}
                    className={styles.input}
                    aria-label={t('emailPlaceholder')}
                  />
                  <div className={styles.buttonGroup}>
                    <Button className={styles.emailButton} aria-label={t('emailItineraryAria')}>
                      {t('emailItineraryButton')}
                    </Button>
                    <Button className={styles.addButton} aria-label={t('addAnotherAria')}>
                      {t('addAnotherButton')}
                    </Button>
                  </div>
                </form>

                <h2 className={styles.sectionTitle}>{t('flightRouteTitle')}</h2>
                <Image
                  src={map}
                  alt={t('flightRouteMapAlt')}
                  className={styles.mapImage}
                  width={756}
                  height={400}
                />
              </div>

              {/* right side */}
              <div className={styles.containerRight}>
                <h2
                  className={styles.sectionTitle}
                  dangerouslySetInnerHTML={{
                    __html: t
                      .raw('shopHotelsTitle')
                      .replace(
                        '<highlight>hotels</highlight>',
                        `<span class="${styles.highlight}">${t('hotelsHighlight')}</span>`,
                      ),
                  }}
                />
                <p className={styles.description}>{t('shopHotelsDescription')}</p>
                <ul className={styles.cardList}>
                  {shopItems.map(({ id, pic, name, price, text }) => (
                    <SummaryCard key={id} pic={pic} name={name} price={price} text={text} />
                  ))}
                </ul>
                <Button
                  variant="cancel"
                  className={styles.shopButton}
                  aria-label={t('shopAllHotelsAria')}
                >
                  {t('shopAllHotelsButton')}
                </Button>

                <h2
                  className={styles.sectionTitle}
                  dangerouslySetInnerHTML={{
                    __html: t
                      .raw('experiencesTitle')
                      .replace(
                        '<highlight>experiences</highlight>',
                        `<span class="${styles.highlight}">${t('experiencesHighlight')}</span>`,
                      ),
                  }}
                />
                <p className={styles.description}>{t('experiencesDescription')}</p>
                <ul className={styles.cardList}>
                  {experienceitems.map(({ id, pic, name, price, text }) => (
                    <SummaryCard key={id} pic={pic} name={name} price={price} text={text} />
                  ))}
                </ul>
                <Button
                  variant="cancel"
                  className={styles.experienceButton}
                  aria-label={t('viewAllExperiencesAria')}
                >
                  {t('viewAllExperiencesButton')}
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
