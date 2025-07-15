import bund from '@/app/assets/images/bund.png';
import opera from '@/app/assets/images/opera.png';
import kyoto from '@/app/assets/images/kyoto.png';
import kenya from '@/app/assets/images/kenya.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import AdventureCard from './AdventureCard';
import Image, { StaticImageData } from 'next/image';

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
    <section className="py-10">
      <div className="max-w-[1342px] w-full mx-auto px-5  ">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[#6E7491] text-2xl font-bold mb-6 ">
              Find your next adventure with these{' '}
              <span className="text-[#605DEC]">flight deals</span>
            </h2>
            <p className="flex items-center text-[#A1B0CC] text-2xl gap-1 ">
              All
              <button className="cursor-pointer">
                <Image src={arrow} alt="" />
              </button>
            </p>
          </div>

          <ul className="flex items-center   rounded-[12px] flex-wrap">
            <div className="flex gap-10 mb-10">
              {adventures.map(({ id, image, name, city, price, desc }) => (
                <AdventureCard
                  id={id}
                  key={id}
                  classname="w-[410px] rounded-[12px]"
                  image={image}
                  name={name}
                  city={city}
                  price={price}
                  desc={desc}
                />
              ))}
            </div>
            <AdventureCard
              classname="w-full"
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
