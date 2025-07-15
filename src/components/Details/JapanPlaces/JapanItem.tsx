import { Adventerus } from '@/components/Main/Adventure/Adventure';
import Image from 'next/image';
import styles from './css/JapanItem.module.css';

export default function JapanItems({ image, name, desc, classname }: Adventerus) {
  return (
    <li className={`${classname} ${styles.card}`}>
      <Image src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <strong className={styles.title}>{name}</strong>
        <p className={styles.description}>{desc}</p>
      </div>
    </li>
  );
}
