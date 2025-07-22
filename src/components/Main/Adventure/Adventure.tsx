'use client';
import Image, { StaticImageData } from 'next/image';
import bund from '@/app/[locale]/assets/images/bund.png';
import opera from '@/app/[locale]/assets/images/opera.png';
import kyoto from '@/app/[locale]/assets/images/kyoto.png';
import kenya from '@/app/[locale]/assets/images/kenya.png';
import arrow from '@/app/[locale]/assets/images/arrowRight.svg';
import AdventureCard from './AdventureCard';
import styles from './css/Adventure.module.css';
import { useTranslations } from 'next-intl';
export interface Adventerus {
  id?: number;
  image: StaticImageData;
  name: string;
  city?: string;
  price?: string;
  desc: string;
  classname?: string;
}

export default function Adventure() {
  const t = useTranslations('HomePage.Adventure');

  const adventures: Adventerus[] = [
    {
      id: 1,
      image: bund,
      name: t('bundName'),
      city: t('bundCity'),
      price: '$598',
      desc: t('bundDesc'),
    },
    {
      id: 2,
      image: opera,
      name: t('operaName'),
      city: t('operaCity'),
      price: '$981',
      desc: t('operaDesc'),
    },
    {
      id: 3,
      image: kyoto,
      name: t('kyotoName'),
      city: t('kyotoCity'),
      price: '$633',
      desc: t('kyotoDesc'),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <div className={styles.headingRow}>
            <h2 className={styles.heading}>
              {t('title')}
              <span className={styles.highlight}>{t('titleSpan')}</span>
            </h2>
            <p className={styles.allButton}>
              {t('allButton')}
              <button type="button" className={styles.arrowButton}>
                <Image src={arrow} alt="View all" width={24} height={24} />
              </button>
            </p>
          </div>

          <ul className={styles.adventureList}>
            <div className={styles.adventureRow}>
              {adventures.map(({ id, image, name, city, price, desc }) => (
                <AdventureCard
                  id={id}
                  key={id}
                  classname={styles.card}
                  image={image}
                  name={name}
                  city={city}
                  price={price}
                  desc={desc}
                />
              ))}
            </div>
            <AdventureCard
              classname={styles.fullWidthCard}
              image={kenya}
              name={t('kenyaName')}
              city={t('kenyaCity')}
              price="$1,248"
              desc={t('kenyaDesc')}
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
