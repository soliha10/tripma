import { Adventerus } from '../Adventure/Adventure';
import maldiv from '@/app/assets/images/maldiv.png';
import morocco from '@/app/assets/images/morocco.png';
import mangolia from '@/app/assets/images/mongolia.png';
import arrow from '@/app/assets/images/arrowRight.svg';
import Image from 'next/image';
import ExploreItem from './ExploreItem';
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
		<section className='py-10'>
			<div className='max-w-[1342px] w-full mx-auto px-5  '>
				<div>
					<div className='flex items-center justify-between'>
						<h2 className='text-[#6E7491] text-2xl font-bold mb-6 '>
							Explore unique
							<span className="bg-[linear-gradient(180deg,_#5CD6C0_0%,_#22C3A6_100%)] bg-clip-text  text-transparent "> places to stay</span>
						</h2>
						<p className='flex items-center text-[#A1B0CC] text-2xl gap-1 '>
							All
							<button className='cursor-pointer'>
								<Image src={arrow} alt='' />
							</button>
						</p>
					</div>

					<ul className='flex items-center   rounded-[12px] flex-wrap'>
						<div className='flex gap-10 mb-20'>
							{explore.map(({ id, image, name, city,  desc }) => (
								<ExploreItem
									key={id}
									classname='w-[410px] rounded-[12px]'
									image={image}
									name={name}
									city={city}
									
									desc={desc}
								/>
							))}
						</div>
					</ul>
          <button className='bg-[#605DEC] text-[#fafafa] w-[195px] py-3 mx-auto rounded block cursor-pointer '>Explore more stays</button>
				</div>
			</div>
		</section>
	);
}
