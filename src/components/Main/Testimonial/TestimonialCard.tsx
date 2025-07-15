import Image, { StaticImageData } from 'next/image';
import styles from './css/TestimonialCard.module.css';

interface Feedbacks {
  userPic: StaticImageData;
  userName: string;
  userLocation: string;
  time: string;
  rating: StaticImageData;
  feedback: string;
}

export default function TestimonialCard({
  userPic,
  userName,
  userLocation,
  time,
  rating,
  feedback,
}: Feedbacks) {
  return (
    <li className={styles.card}>
      <Image src={userPic} alt={userName} width={48} height={48} />

      <div className={styles.content}>
        <strong className={styles.name}>{userName}</strong>
        <span className={styles.location}>
          {userLocation} <time>{time}</time>
        </span>
        <Image src={rating} alt="rating" className="mb-3" />
        <p className={styles.feedback}>
          {feedback} <span className={styles.link}>read more...</span>
        </p>
      </div>
    </li>
  );
}
