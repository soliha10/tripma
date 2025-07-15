import seoul from '@/app/assets/images/seoul.png';
import china from '@/app/assets/images/bund.png';
import kenya from '@/app/assets/images/kenya-d.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import SanFransiscoItem from './SanFransiscoItem';
import Image from 'next/image';
import styles from './css/SanFransiscoPlaces.module.css';

export default function SanFransiscoPlaces() {
  const japanItems = [
    {
      id: 1,
      image: china,
      name: 'Shanghai, ',
      price: '$598',
      city: 'China',
      desc: 'An international city rich in culture',
    },
    {
      id: 2,
      image: kenya,
      name: 'Nairobi, ',
      price: '$1,248',
      city: 'Kenya',
      desc: 'Dubbed the Safari Capital of the World',
    },
    {
      id: 3,
      image: seoul,
      name: 'Seoul, ',
      price: '$589',
      city: 'South Korea',
      desc: 'This modern city is a traveler’s dream',
    },
  ];

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              People in <span className={styles.highlight}>San Francisco </span>
              also searched for
            </h2>
            <p className={styles.all}>
              All
              <button className="cursor-pointer">
                <Image src={arrow} alt="" />
              </button>
            </p>
          </div>
          <ul className={styles.list}>
            {japanItems.map(({ id, name, image, desc, price, city }) => (
              <SanFransiscoItem
                key={id}
                image={image}
                name={name}
                price={price}
                desc={desc}
                city={city}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
