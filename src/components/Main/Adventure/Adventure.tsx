'use client';
import Image, { StaticImageData } from 'next/image';
import bund from '@/app/assets/images/bund.png';
import opera from '@/app/assets/images/opera.png';
import kyoto from '@/app/assets/images/kyoto.png';
import kenya from '@/app/assets/images/kenya.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import AdventureCard from './AdventureCard';
import styles from './css/Adventure.module.css';

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
  const adventures: Adventerus[] = [
    {
      id: 1,
      image: bund,
      name: 'The Bund, ',
      city: 'Shanghai',
      price: '$598',
      desc: 'China’s most international city',
    },
    {
      id: 2,
      image: opera,
      name: 'Sydney Opera House, ',
      city: 'Sydney',
      price: '$981',
      desc: 'Take a stroll along the famous harbor',
    },
    {
      id: 3,
      image: kyoto,
      name: 'Kōdaiji Temple, ',
      city: 'Kyoto',
      price: '$633',
      desc: 'Step back in time in the Gion district',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <div className={styles.headingRow}>
            <h2 className={styles.heading}>
              Find your next adventure with these{' '}
              <span className={styles.highlight}>flight deals</span>
            </h2>
            <p className={styles.allButton}>
              All
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
              name="Tsavo East National Park, "
              city="Kenya"
              price="$1,248"
              desc="Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert."
            />
          </ul>
        </div>
      </div>
    </section>
  );
}
