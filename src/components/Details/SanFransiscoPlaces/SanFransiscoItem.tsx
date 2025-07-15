import { Adventerus } from '@/components/Main/Adventure/Adventure';
import Image from 'next/image';
import styles from './css/SanFransiscoItem.module.css';

export default function SanFransiscoItem({
  id,
  image,
  name,
  city,
  price,
  desc,
  classname,
}: Adventerus) {
  return (
    <li key={id} className={`${styles.listItem} ${classname}`}>
      <Image src={image} alt="" className={styles.image} />
      <div className={styles.body}>
        <div className={styles.header}>
          <strong className={styles.name}>
            {name} <span className={styles.city}>{city}</span>
          </strong>
          <span className={styles.price}>{price}</span>
        </div>
        <p className={styles.description}>{desc}</p>
      </div>
    </li>
  );
}
