import Image from 'next/image';
import { Adventerus } from './Adventure';
import styles from './css/AdventureCard.module.css';

export default function AdventureCard({
  id,
  image,
  name,
  city,
  price,
  desc,
  classname,
}: Adventerus) {
  return (
    <li key={id} className={`${styles.card} ${classname || ''}`}>
      <Image src={image} alt="" className={styles.imageTop} />
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <strong className={styles.place}>
            {name} <span className={styles.city}>{city}</span>
          </strong>
          <span className={styles.price}>{price}</span>
        </div>
        <p className={styles.description}>{desc}</p>
      </div>
    </li>
  );
}
