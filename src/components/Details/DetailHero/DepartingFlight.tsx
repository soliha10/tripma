'use client';
import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Flight } from './DetailHero';
import styles from './css/DepartingFlight.module.css';

import hawai from '@/app/[locale]/assets/images/Hawaiian-Airlines.svg';
import japan from '@/app/[locale]/assets/images/image 27.svg';
import delta from '@/app/[locale]/assets/images/Delta Airlines.svg';
import hawai2 from '@/app/[locale]/assets/images/United Airlines.svg';
import qatnas from '@/app/[locale]/assets/images/image 28.svg';
export const flights = [
  {
    id: 1,
    pic: hawai,
    duration: '16h 45m',
    airlineType: 'Hawaiian Airlines',
    time: '7:00AM - 4:15PM',
    stop: '1 stop',
    stopDuration: '2h 45m in HNL',
    price: '$624',
    tripType: 'round trip',
  },
  {
    id: 2,
    pic: japan,
    duration: '18h 22m',
    airlineType: 'Japan Airlines',
    time: '7:35 AM - 12:15 PM',
    stop: '1 stop ',
    stopDuration: '50m in HKG',
    price: '$663',
    tripType: 'round trip',
  },
  {
    id: 3,
    pic: hawai,
    duration: '18h 04m',
    airlineType: 'Hawaiian Airlines',
    time: '8:20 AM - 2:15 PM',
    stop: '1 stop',
    stopDuration: '1h 50m in PVG',
    price: '$690',
    tripType: 'round trip',
  },
  {
    id: 4,
    pic: delta,
    duration: '18h 52m',
    airlineType: 'Delta',
    time: '9:47 AM - 4:15 PM',
    stop: '1 stop',
    stopDuration: '4h 05m in ICN',
    price: '$756',
    tripType: 'round trip',
  },
  {
    id: 5,
    pic: hawai2,
    duration: '16h 05m',
    airlineType: 'Hawaiian Airlines',
    time: '11:15 AM - 7:45 PM',
    stop: 'Nonstop',
    stopDuration: '',
    price: '$837',
    tripType: 'round trip',
  },
  {
    id: 6,
    pic: qatnas,
    duration: '16h 05m',
    airlineType: 'Hawaiian Airlines',
    time: '11:15 AM - 7:45 PM',
    stop: 'Nonstop',
    stopDuration: '',
    price: '$837',
    tripType: 'round trip',
  },
];

type FlightProps = {
  onSelect: (flight: Flight) => void;
};

export function DepartingFlight({ onSelect }: FlightProps) {
  return (
    <Table className={styles.table}>
      <TableCaption className={styles.caption}>
        Choose a <span className={styles.highlight}>departing</span> flight
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
