'use client';
import seoul from '@/app/[locale]/assets/images/seoul.png';
import china from '@/app/[locale]/assets/images/bund.png';
import kenya from '@/app/[locale]/assets/images/kenya-d.png';
import arrow from '@/app/[locale]/assets/images/arrowRight.svg';
import SanFransiscoItem from './SanFransiscoItem';
import Image from 'next/image';
import styles from './css/SanFransiscoPlaces.module.css';
import { useTranslations } from 'next-intl';
export default function SanFransiscoPlaces() {
  const t = useTranslations('DetailPage.sanFransiscoPlaces');
  const japanItems = [
    {
      id: 1,
      image: china,
      name: t('chinaTitle'),
      price: '$598',
      city: t('chinaCity'),
      desc: t('chinaDesc'),
    },
    {
      id: 2,
      image: kenya,
      name: t('kenyaTitle'),
      price: '$1,248',
      city: t('kenyaCity'),
      desc: t('kenyaDesc'),
    },
    {
      id: 3,
      image: seoul,
      name: t('seoul'),
      price: '$589',
      city: t('seoulCity'),
      desc: t('seoulDesc'),
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionWrapper}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {t('sanFransiscoTitle')}{' '}
              <span className={styles.highlight}> {t('sanFransiscoTitleSpan')}</span>
              {t('sanFransiscoPart')}
            </h2>
            <p className={styles.all}>
              {t('sanFransiscoBtn')}
              <button type="button" className={styles.button}>
                <Image src={arrow} alt="View all" width={24} height={24} />
              </button>
            </p>
          </div>
          <ul className={styles.list}>
            {japanItems.map(({ id, name, image, desc, price, city }) => (
              <SanFransiscoItem
                key={id}
                id={id}
                image={image}
                name={name}
                price={price}
                desc={desc}
                city={city}
                classname={styles.card}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
