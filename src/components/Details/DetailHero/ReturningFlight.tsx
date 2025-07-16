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
        Choose a <span className={styles.highlight}>returning</span> flight
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
