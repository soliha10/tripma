import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from '@/components/ui/table';
import hawai from '@/app/assets/images/Hawaiian-Airlines.svg';
import Image from 'next/image';
import japan from '@/app/assets/images/image 27.svg';
import delta from '@/app/assets/images/Delta Airlines.svg';
import hawai2 from '@/app/assets/images/United Airlines.svg';
import qatnas from '@/app/assets/images/image 28.svg';
const flights = [
	{
		id: 1,
		pic: hawai,
		duration: '16h 45m',
		airlineType: 'Hawaiian Airlines',
		time: '7:00AM - 4:15PM',
		stop: '1 stop',
		stopDuration: '2h 45m in HNL',
		price: '$624',
		tripType: 'round trip',
	},
	{
		id: 2,
		pic: japan,
		duration: '18h 22m',
		airlineType: 'Japan Airlines',
		time: '7:35 AM - 12:15 PM',
		stop: '1 stop ',
		stopDuration: '50m in HKG',
		price: '$663',
		tripType: 'round trip',
	},
	{
		id: 3,
		pic: hawai,
		duration: '18h 04m',
		airlineType: 'Hawaiian Airlines',
		time: '8:20 AM - 2:15 PM',
		stop: '1 stop',
		stopDuration: '1h 50m in PVG',
		price: '$690',
		tripType: 'round trip',
	},
	{
		id: 4,
		pic: delta,
		duration: '18h 52m',
		airlineType: 'Delta',
		time: '9:47 AM - 4:15 PM',
		stop: '1 stop',
		stopDuration: '4h 05m in ICN',
		price: '$756',
		tripType: 'round trip',
	},
	{
		id: 5,
		pic: hawai2,
		duration: '16h 05m',
		airlineType: 'Hawaiian Airlines',
		time: '11:15 AM - 7:45 PM',
		stop: 'Nonstop',
		stopDuration: '',
		price: '$837',
		tripType: 'round trip',
	},
];

export function DepartingFlight() {
	return (
		<Table>
			<TableCaption className='text-[#6E7491] text-[18px] font-semibold text-left mb-4'>Choose a <span className='text-[#605DEC]'>departing</span> flight</TableCaption>

			<TableBody className='border border-[#E9E8FC] rounded-xl  '>
				{flights.map(
					({
						id,
						pic,
						duration,
						airlineType,
						time,
						stop,
						stopDuration,
						price,
						tripType,
					}) => (
						<TableRow key={id}>
							<TableCell className='font-medium'>
								<Image src={pic} alt='pic' />
							</TableCell>
							<TableCell>
								<span>{duration}</span> <span>{airlineType}</span>
							</TableCell>
							<TableCell>{time}</TableCell>
							<TableCell className='text-right'>
								<span>{stop}</span> <span>{stopDuration}</span>
							</TableCell>
							<TableCell className='text-right'>
								<span>{price}</span> <span>{tripType}</span>
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
		</Table>
	);
}
