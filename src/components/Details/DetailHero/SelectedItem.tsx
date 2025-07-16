'use client';
import Image, { StaticImageData } from 'next/image';
import styles from './css/SelectedItem.module.css';

interface FlightType {
  id: number;
  pic: StaticImageData;
  duration: string;
  airlineType: string;
  time: string;
  stopDuration: string;
}

export default function SelectedItem({
  id,
  pic,
  duration,
  airlineType,
  time,
  stopDuration,
}: FlightType) {
  return (
    <div key={id} className={styles.container}>
      <Image src={pic} alt={airlineType} width={40} height={40} className={styles.airlineLogo} />
      <div className={styles.info}>
        <span>{airlineType}</span>
        <span className={styles.flightCode}>FIG4312</span>
      </div>
      <div className={styles.timeInfo}>
        <span>{duration}</span>
        <time>{time}</time>
        <span className={styles.stopDuration}>{stopDuration}</span>
      </div>
    </div>
  );
}
