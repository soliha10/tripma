import Image, { StaticImageData } from 'next/image';
interface FlightType {
  id: number;
  pic: StaticImageData;
  duration: string;
  airlineType: string;
  time: string;
  stopDuration: string;
  stop?: string;
  price: string;
  tripType: string
}
export default function SelectedSeatsSummary({
  // id,
  pic,
  duration,
  airlineType,
  time,
  stopDuration,
  stop,
  price, 
  tripType
}: FlightType) {
  return (
    <div	
							className={`text-[#27273F] w-full flex py-3 px-4 hover:bg-[#F6F6FE]  `}
						>
								<Image src={pic} alt='pic' className='me-6' />
							
							<span className='w-[156.5px] flex flex-col gap-1 me-[34px] '>
								<span className='text-[#27273F]'>{duration}</span>{' '}
								<span className='text-[#7C8DB0]'>{airlineType}</span>
							</span>
							<span className='w-[156.5px] me-[34px]'>{time}</span>
							<span className='text-right w-[156.5px] flex flex-col gap-1 me-[34px] '>
								<span>{stop}</span>
								<span className='text-[#7C8DB0]'>{stopDuration}</span>
							</span>
							<span className='text-right w-[156.5px] me-8 flex gap-1 flex-col'>
								<span>{price}</span>
								<span className='text-[#7C8DB0]'>{tripType}</span>
							</span>
						</div>
  );
}
