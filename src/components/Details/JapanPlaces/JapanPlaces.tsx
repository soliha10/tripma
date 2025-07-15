import JapanItems from './JapanItem';
import sasa from '@/app/assets/images/sasa.png';
import flag from '@/app/assets/images/flag.png';
import shinjuku from '@/app/assets/images/shinjuku.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import Image from 'next/image';
import styles from './css/JapanPlaces.module.css';

export default function JapanPlaces() {
  const japanItems = [
    {
      id: 1,
      image: sasa,
      name: 'Hotel Kaneyamaen and Bessho SASA',
      desc: 'Located at the base of Mount Fuji, Hotel Kaneyamaen is a traitional japanese ryokan with a modern twist. Enjoy a private onsen bath and a private multi-course kaiseki dinner.',
    },
    {
      id: 2,
      image: flag,
      name: 'HOTEL THE FLAG 大阪市',
      desc: 'Make a stop in Osaka and stay at HOTEL THE FLAG, just a few minutes walk to experience the food culture surrounding Dontonbori. Just one minute away is the Shinsaibashi shopping street.',
    },
    {
      id: 3,
      image: shinjuku,
      name: '9 Hours Shinjuku',
      desc: 'Experience a truly unique stay in an authentic Japanese capsule hotel. 9 Hours Shinjuku is minutes from one of Japan’s busiest train stations. Just take the NEX train from Narita airport!',
    },
  ];

  return (
    <section>
      <div className={styles.wrapper}>
        <div className={styles.sectionWrapper}>
          <div className={styles.heading}>
            <h2 className={styles.title}>
              Find <span>places to stay</span> in Japan
            </h2>
            <p className={styles.all}>
              All
              <button className={styles.button}>
                <Image src={arrow} alt="arrow" />
              </button>
            </p>
          </div>
          <ul className={styles.list}>
            {japanItems.map(({ id, name, image, desc }) => (
              <JapanItems key={id} image={image} name={name} desc={desc} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
