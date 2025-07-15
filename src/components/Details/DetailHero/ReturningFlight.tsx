import { Table, TableBody, TableCaption, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Flight } from './DetailHero';
import { flights } from './DepartingFlight';
import styles from './css/ReturningFlight.module.css';

type FlightProps = {
  onSelect: (flight: Flight) => void;
};

export function ReturningFlight({ onSelect }: FlightProps) {
  return (
    <Table className={styles.table}>
      <TableCaption className={styles.caption}>
        Choose a <span>returning</span> flight
      </TableCaption>

      <TableBody className={styles.body}>
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
              className={`${styles.row} ${id === 1 ? styles.rowFirst : styles.rowOther}`}
            >
              <TableCell className={styles.cellLogo}>
                <Image src={pic} alt="pic" />
              </TableCell>
              <TableCell className={styles.cellDuration}>
                <span className={styles.duration}>{duration}</span>
                <span className={styles.airlineType}>{airlineType}</span>
              </TableCell>
              <TableCell className={styles.cellTime}>{time}</TableCell>
              <TableCell className={styles.cellStop}>
                <span>{stop}</span>
                <span className={styles.airlineType}>{stopDuration}</span>
              </TableCell>
              <TableCell className={styles.cellPrice}>
                <span>{price}</span>
                <span className={styles.tripType}>{tripType}</span>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
