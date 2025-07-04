import Image, { StaticImageData } from 'next/image';
interface FlightType {
	id: number;
	pic: StaticImageData;
	duration: string;
	airlineType: string;
	time: string;
	stopDuration: string;
}
export default function SelectedItem({
	id,
	pic,
	duration,
	airlineType,
	time,
	stopDuration,
}: FlightType) {
	return (
		<div key={id} className='w-full border border-[#E9E8FC] rounded-xl p-6 text-[#27273F] flex items-start justify-between '>
			<Image src={pic} alt='pic' width={40} height={40} />
			<div className='lg:w-[148px] flex flex-col'>
				<span>{airlineType}</span>
				<span className='text-[#7C8DB0]'>FIG4312</span>
			</div>
			<div className='lg:w-[148px] flex flex-col text-right'>
				<span>{duration}</span>
				<time>{time}</time>
				<span className='text-[#7C8DB0]'>{stopDuration}</span>
			</div>
		</div>
	);
}
