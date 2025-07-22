'use client';
import user1 from '@/app/[locale]/assets/images/avatar.png';
import user2 from '@/app/[locale]/assets/images/avatar (1).png';
import user3 from '@/app/[locale]/assets/images/avatar (2).png';
import fullRating from '@/app/[locale]/assets/images/star-full.svg';
import rating from '@/app/[locale]/assets/images/star row.svg';
import TestimonialCard from './TestimonialCard';
import styles from './css/Testimonial.module.css';
import { useTranslations } from 'next-intl';
export default function Testimonial() {
  const t = useTranslations('HomePage.Testimonial');
  const feedbacks = [
    {
      id: 1,
      userPic: user1,
      userName: t('chen'),
      userLocation: t('chenLocation'),
      time: t('chenTime'),
      rating: fullRating,
      feedback: t('chenFeedback'),
    },
    {
      id: 2,
      userPic: user2,
      userName: t('kaori'),
      userLocation: t('kaoriLocation'),
      time: t('kaoriTime'),
      rating: rating,
      feedback: t('kaoriFeedback'),
    },
    {
      id: 3,
      userPic: user3,
      userName: t('anthony'),
      userLocation: t('anthonyLocation'),
      time: t('anthonyTime'),
      rating: fullRating,
      feedback: t('anthonyFeedback'),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.title}>
            {t('title')} <span className={styles.highlight}>{t('titleSpan')}</span> {t('titlePart')}
          </h2>
          <ul className={styles.testimonialList}>
            {feedbacks.map(({ id, userPic, userName, userLocation, time, rating, feedback }) => (
              <TestimonialCard
                key={id}
                userPic={userPic}
                userName={userName}
                userLocation={userLocation}
                time={time}
                rating={rating}
                feedback={feedback}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
