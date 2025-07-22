'use client';
import JapanItems from './JapanItem';
import sasa from '@/app/[locale]/assets/images/sasa.png';
import flag from '@/app/[locale]/assets/images/flag.png';
import shinjuku from '@/app/[locale]/assets/images/shinjuku.png';
import arrow from '@/app/[locale]/assets/images/arrowRight.svg';
import Image from 'next/image';
import styles from './css/JapanPlaces.module.css';
import { useTranslations } from 'next-intl';
export default function JapanPlaces() {
  const t = useTranslations('DetailPage');
  const japanItems = [
    {
      id: 1,
      image: sasa,
      name: t('japanPlaces.sasaTitle'),
      desc: t('japanPlaces.sasaDesc'),
    },
    {
      id: 2,
      image: flag,
      name: t('japanPlaces.flagTitle'),
      desc: t('japanPlaces.flagDesc'),
    },
    {
      id: 3,
      image: shinjuku,
      name: t('japanPlaces.shinjukuTitle'),
      desc: t('japanPlaces.shinjukuDesc'),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.sectionWrapper}>
          <div className={styles.heading}>
            <h2 className={styles.title}>
              {t('japanPlaces.japanTitle')}{' '}
              <span className={styles.titleHighlight}>{t('japanPlaces.japanTitleSpan')}</span>{' '}
              {t('japanPlaces.japanPart')}
            </h2>
            <p className={styles.all}>
              {t('japanPlaces.japanBtn')}
              <button type="button" className={styles.button}>
                <Image src={arrow} alt="View all" width={24} height={24} />
              </button>
            </p>
          </div>
          <ul className={styles.list}>
            {japanItems.map(({ id, name, image, desc }) => (
              <JapanItems key={id} image={image} name={name} desc={desc} classname={styles.card} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
