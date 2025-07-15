import Image from 'next/image';
import { EmailType } from './LoginModal';
import styles from './css/Email.module.css';

export default function Email({ pic, text }: EmailType) {
  return (
    <li className={styles.emailItem}>
      <a href="" className={styles.emailLink}>
        <Image src={pic} alt="icon" />
        <span className={styles.emailText}>{text}</span>
      </a>
    </li>
  );
}
