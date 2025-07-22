'use client';
import Image from 'next/image';
import { Adventerus } from '../Adventure/Adventure';
import maldiv from '@/app/[locale]/assets/images/maldiv.png';
import morocco from '@/app/[locale]/assets/images/morocco.png';
import mangolia from '@/app/[locale]/assets/images/mongolia.png';
import arrow from '@/app/[locale]/assets/images/arrowRight.svg';
import ExploreItem from './ExploreItem';
import styles from './css/Explore.module.css';
import { useTranslations } from 'next-intl';

export default function Explore() {
  const t = useTranslations('HomePage.Explore');
  const explore: Adventerus[] = [
    {
      id: 1,
      image: maldiv,
      name: t('maldiveName'),
      city: t('maldiveCity'),
      desc: t('maldiveDesc'),
    },
    {
      id: 2,
      image: morocco,
      name: t('moroccoName'),
      city: t('moroccoCity'),
      desc: t('moroccoDesc'),
    },
    {
      id: 3,
      image: mangolia,
      name: t('mangoliaName'),
      city: t('mangoliaCity'),
      desc: t('mangoliaDesc'),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <div className={styles.headingRow}>
            <h2 className={styles.headingText}>
              {t('title')}
              <span className={styles.gradientText}>{t('titleSpan')}</span>
            </h2>
            <p className={styles.allBtn}>
              {t('allBtn')}
              <button type="button" className={styles.arrowButton}>
                <Image src={arrow} alt="View all" width={24} height={24} />
              </button>
            </p>
          </div>

          <ul className={styles.cardListWrapper}>
            <div className={styles.cardGroup}>
              {explore.map(({ id, image, name, city, desc }) => (
                <ExploreItem
                  key={id}
                  classname={styles.card}
                  image={image}
                  name={name}
                  city={city}
                  desc={desc}
                />
              ))}
            </div>
          </ul>

          <button type="button" className={styles.exploreButton}>
            {t('button')}
          </button>
        </div>
      </div>
    </section>
  );
}
