import JapanItems from './JapanItem';
import sasa from '@/app/assets/images/sasa.png';
import flag from '@/app/assets/images/flag.png';
import shinjuku from '@/app/assets/images/shinjuku.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import Image from 'next/image';
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
			<div className='max-w-[1342px] w-full mx-auto px-5  '>
				<div className='pb-[80px]'>
					<div className='flex items-center justify-between mb-6'>
						<h2 className='text-[#6E7491] text-2xl font-bold '>
							Find <span className='text-[#605DEC]'>places to stay</span> in
							Japan
						</h2>
						<p className='flex items-center text-[#A1B0CC] text-2xl gap-1 '>
							All
							<button className='cursor-pointer'>
								<Image src={arrow} alt='' />
							</button>
						</p>
					</div>
					<ul className='flex justify-between'>
						{japanItems.map(({ id, name, image, desc }) => (
							<JapanItems key={id} image={image} name={name} desc={desc} />
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}
