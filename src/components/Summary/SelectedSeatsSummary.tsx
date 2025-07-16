'use client';
import Image, { StaticImageData } from 'next/image';
import styles from './css/SelectedSeatsSummary.module.css';

interface FlightType {
  id: number;
  pic: StaticImageData;
  duration: string;
  airlineType: string;
  time: string;
  stopDuration: string;
  stop?: string;
  price: string;
  tripType: string;
}

export default function SelectedSeatsSummary({
  pic,
  duration,
  airlineType,
  time,
  stopDuration,
  stop,
  price,
  tripType,
}: FlightType) {
  return (
    <div className={styles.container}>
      <Image
        src={pic}
        alt={`${airlineType} flight`}
        className={styles.image}
        width={48}
        height={48}
      />
      <span className={styles.durationWrapper}>
        <span className={styles.duration}>{duration}</span>
        <span className={styles.airlineType}>{airlineType}</span>
      </span>
      <span className={styles.time}>{time}</span>
      <span className={styles.stopWrapper}>
        <span>{stop || 'Nonstop'}</span>
        <span className={styles.stopDuration}>{stopDuration}</span>
      </span>
      <span className={styles.priceWrapper}>
        <span>{price}</span>
        <span className={styles.tripType}>{tripType}</span>
      </span>
    </div>
  );
}
