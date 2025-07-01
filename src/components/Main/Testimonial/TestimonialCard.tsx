import Image, { StaticImageData } from 'next/image';
interface Feedbacks {
	userPic: StaticImageData;
	userName: string;
	userLocation: string;
	time: string;
	rating: any;
	feedback: string;
}
export default function TestimonialCard({
	userPic,
	userName,
	userLocation,
	time,
	rating,
	feedback,
}: Feedbacks) {
	return (
		<li className='lg:w-[410px] flex items-start p-4 gap-4'>
			<Image src={userPic} alt={userName} width={48} height={48}/>

			<div className='flex flex-col w-[314px]'>
				<strong className='text-[#6E7491] text-[18px] font-semibold ' >{userName}</strong>
				<span className='text-[#6E7491] text-[18px] font-semibold mb-2 '>
					{userLocation} <time>{time}</time>{' '}
				</span>
				<Image src={rating} alt='pic' className='mb-3' />
				<p className='text-[#27273F] text-[18px] '>
					{feedback} <span className='text-[#605DEC]' > read more...</span>
				</p>
			</div>
		</li>
	);
}
