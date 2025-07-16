'use client';
import Image, { StaticImageData } from 'next/image';
import styles from './css/SummaryCard.module.css';

interface CardType {
  id?: number;
  pic: StaticImageData;
  name: string;
  price: string;
  text: string;
}

export default function SummaryCard({ pic, name, price, text }: CardType) {
  return (
    <li className={styles.container}>
      <Image src={pic} alt={name} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.header}>
          <strong>{name}</strong>
          <strong>{price}</strong>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </li>
  );
}
