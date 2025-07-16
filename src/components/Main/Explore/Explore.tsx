'use client';
import Image from 'next/image';
import { Adventerus } from '../Adventure/Adventure';
import maldiv from '@/app/assets/images/maldiv.png';
import morocco from '@/app/assets/images/morocco.png';
import mangolia from '@/app/assets/images/mongolia.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import ExploreItem from './ExploreItem';
import styles from './css/Explore.module.css';

export default function Explore() {
  const explore: Adventerus[] = [
    {
      id: 1,
      image: maldiv,
      name: 'Stay among the atolls in ',
      city: 'Maldives',
      desc: "From the 2nd century AD, the islands were known as the 'Money Isles' due to the abundance of cowry shells, a currency of the early ages.",
    },
    {
      id: 2,
      image: morocco,
      name: 'Experience the Ourika Valley in ',
      city: 'Morocco',
      desc: 'Morocco’s Hispano-Moorish architecture blends influences from Berber culture, Spain, and contemporary artistic currents in the Middle East.',
    },
    {
      id: 3,
      image: mangolia,
      name: 'Live traditionally in ',
      city: 'Mongolia',
      desc: 'Traditional Mongolian yurts consists of an angled latticework of wood or bamboo for walls, ribs, and a wheel.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <div className={styles.headingRow}>
            <h2 className={styles.headingText}>
              Explore unique
              <span className={styles.gradientText}> places to stay</span>
            </h2>
            <p className={styles.allBtn}>
              All
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
            Explore more stays
          </button>
        </div>
      </div>
    </section>
  );
}
