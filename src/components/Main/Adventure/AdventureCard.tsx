import Image from 'next/image';
import { Adventerus } from './Adventure';

export default function AdventureCard({
	image,
	name,
	city,
	price,
	desc,
	classname,
}: Adventerus) {
	return (
		<li
			className={`${classname} w-[410px] rounded-[12px] cursor-pointer `}
			style={{
				boxShadow:
					'0px 2px 4px 0px rgba(28, 5, 77, 0.10), 0px 12px 32px 0px rgba(0, 0, 0, 0.05)',
			}}
		>
			<Image src={image} alt='' className='rounded-t-[12px]' />
			<div className='py-4 px-6'>
				<div className='flex items-center justify-between mb-1'>
					<strong className='text-[#6E7491] text-[18px] font-semibold '>
						{name} <span className='text-[#605DEC]'>{city}</span>
					</strong>
					<span className='text-[#6E7491] text-[18px] font-semibold'>
						{price}
					</span>
				</div>
				<p className='text-[#7C8DB0]'>{desc}</p>
			</div>
		</li>
	);
}
