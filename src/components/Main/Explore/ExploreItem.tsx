import Image from 'next/image';
import { Adventerus } from '../Adventure/Adventure';
import styles from './css/ExploreItem.module.css';

export default function ExploreItem({ image, name, city, desc, classname }: Adventerus) {
  return (
    <li className={`${styles.card} ${classname}`}>
      <Image src={image} alt="" className={styles.image} />
      <div className={styles.content}>
        <div className={styles.titleWrapper}>
          <strong className={styles.title}>
            {name} <span className={styles.city}>{city}</span>
          </strong>
        </div>
        <p className={styles.desc}>{desc}</p>
      </div>
    </li>
  );
}
