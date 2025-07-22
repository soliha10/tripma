import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Flight } from './DetailHero';
import styles from './css/ReturningFlight.module.css';
import { useTranslations } from 'next-intl';
import hawai from '@/app/[locale]/assets/images/Hawaiian-Airlines.svg';
import japan from '@/app/[locale]/assets/images/image 27.svg';
import delta from '@/app/[locale]/assets/images/Delta Airlines.svg';
import hawai2 from '@/app/[locale]/assets/images/United Airlines.svg';
import qatnas from '@/app/[locale]/assets/images/image 28.svg';
type FlightProps = {
  onSelect: (flight: Flight) => void;
};

export function ReturningFlight({ onSelect }: FlightProps) {
  const t = useTranslations('DetailPage.returningFlight');
  const flights = [
    {
      id: 1,
      pic: hawai,
      duration: t('hawaiDuration'),
      airlineType: t('hawai'),
      time: t('hawaiTime'),
      stop: t('hawaiStop'),
      stopDuration: t('hawaiStopDuration'),
      price: '$624',
      tripType: t('hawaiTripType'),
    },
    {
      id: 2,
      pic: japan,
      duration: t('japanDuration'),
      airlineType: t('japan'),
      time: t('japanTime'),
      stop: t('japanStop'),
      stopDuration: t('japanStopDuration'),
      price: '$663',
      tripType: t('japanTripType'),
    },
    {
      id: 3,
      pic: hawai,
      duration: t('hawai2Duration'),
      airlineType: t('hawai2'),
      time: t('hawai2Time'),
      stop: t('hawai2Stop'),
      stopDuration: t('hawai2StopDuration'),
      price: '$690',
      tripType: t('hawai2TripType'),
    },
    {
      id: 4,
      pic: delta,
      duration: t('deltaDuration'),
      airlineType: t('delta'),
      time: t('deltaTime'),
      stop: t('deltaStop'),
      stopDuration: t('deltaStopDuration'),
      price: '$756',
      tripType: t('deltaTripType'),
    },
    {
      id: 5,
      pic: hawai2,
      duration: t('hawai2Duration'),
      airlineType: t('hawai2'),
      time: t('hawai2Time'),
      stop: t('hawai2Stop'),
      stopDuration: t('hawai2StopDuration'),
      price: '$837',
      tripType: t('hawai2TripType'),
    },
    {
      id: 6,
      pic: qatnas,
      duration: t('qatnasDuration'),
      airlineType: t('qatnas'),
      time: t('qatnasTime'),
      stop: t('qatnasStop'),
      stopDuration: t('qatnasStopDuration'),
      price: '$837',
      tripType: t('qatnasTripType'),
    },
  ];
  return (
    <Table className={styles.table}>
      <TableCaption className={styles.caption}>
        {t('returningFlightName')}{' '}
        <span className={styles.highlight}>{t('returningFlightSpan')}</span>{' '}
        {t('returningFlightPart')}
      </TableCaption>

      <TableBody className={styles.tableBody}>
        {flights.map(
          ({ id, pic, duration, airlineType, time, stop, stopDuration, price, tripType }) => (
            <TableRow
              key={id}
              onClick={() =>
                onSelect({
                  id,
                  pic,
                  duration,
                  airlineType,
                  time,
                  stop,
                  stopDuration,
                  price,
                  tripType,
                })
              }
              className={`${styles.tableRow} ${id === 1 ? styles.firstRow : styles.otherRows}`}
            >
              <TableCell className={styles.cell}>
                <Image src={pic} alt={airlineType} width={80} height={24} />
              </TableCell>

              <TableCell className={styles.durationCell}>
                <span>{duration}</span>
                <span className={styles.secondaryText}>{airlineType}</span>
              </TableCell>

              <TableCell className={styles.timeCell}>{time}</TableCell>

              <TableCell className={styles.stopCell}>
                <span>{stop}</span>
                <span className={styles.secondaryText}>{stopDuration}</span>
              </TableCell>

              <TableCell className={styles.priceCell}>
                <span>{price}</span>
                <span className={styles.secondaryText}>{tripType}</span>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
