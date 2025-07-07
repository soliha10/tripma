import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

import { Flight } from './DetailHero';
import { flights } from './DepartingFlight';

type FlightProps = {
	onSelect: (flight: Flight) => void;
};

export function ReturningFlight({ onSelect }: FlightProps) {
	return (
		<Table className='w-[872px] mb-6  '>
			<TableCaption className='text-[#6E7491] text-[18px] font-semibold text-left mb-4'>
				Choose a <span className='text-[#605DEC]'>returning</span> flight
			</TableCaption>

			<TableBody className='border border-[#E9E8FC] rounded-xl  h-[456px] overflow-auto  '>
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
						<TableRow
							key={id}
							onClick={() =>
								onSelect({
									id,
									pic,
									duration,
									airlineType,
									time,
									stop,
									stopDuration,
									price,
									tripType,
								})
							}
							className={`text-[#27273F] flex ${
								id == 1 ? 'pt-7' : 'pt-4'
							} hover:bg-[#F6F6FE]  `}
						>
							<TableCell className='font-medium me-6 '>
								<Image src={pic} alt='pic' />
							</TableCell>
							<TableCell className='w-[156.5px] flex flex-col gap-1 me-[34px] '>
								<span className='text-[#27273F]'>{duration}</span>{' '}
								<span className='text-[#7C8DB0]'>{airlineType}</span>
							</TableCell>
							<TableCell className='w-[156.5px] me-[34px]'>{time}</TableCell>
							<TableCell className='text-right w-[156.5px] flex flex-col gap-1 me-[34px] '>
								<span>{stop}</span>
								<span className='text-[#7C8DB0]'>{stopDuration}</span>
							</TableCell>
							<TableCell className='text-right w-[156.5px] me-8 flex gap-1 flex-col'>
								<span>{price}</span>
								<span className='text-[#7C8DB0]'>{tripType}</span>
							</TableCell>
						</TableRow>
					),
				)}
			</TableBody>
		</Table>
	);
}
