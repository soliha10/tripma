'use client';
import Image from 'next/image';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';
import close from '@/app/assets/images/close-summary.svg';
import { useState } from 'react';
import { useFlight } from '@/context/FlightContext';
import SelectedSeatsSummary from './SelectedSeatsSummary';
import visa from '@/app/assets/images/visa.svg';
import map from '@/app/assets/images/map-summary.svg';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableRow,
} from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ryokan from '@/app/assets/images/ryokan.png';
import bessho from '@/app/assets/images/bessho.png';
import hotel from '@/app/assets/images/hotel.png';
import hours from '@/app/assets/images/hours.png';
import nihon from '@/app/assets/images/nihon.png';
import teamlab from '@/app/assets/images/teamlab.png';

export default function SummaryPage() {
	const [isOpen, setIsOpen] = useState(true);
	const { selectedDepartFlight, selectedReturnFlight } = useFlight();

	const shopItems = [
		{
			id: 1,
			pic: ryokan,
			name: 'Ryokan Japan',
			price: '$439',
			text: 'Enjoy views of the garden from your room',
		},
		{
			id: 2,
			pic: bessho,
			name: 'Bessho SASA',
			price: '$529',
			text: 'Japanese ryokan with private onsen bath',
		},
		{
			id: 3,
			pic: hotel,
			name: 'HOTEL THE FLAG 大阪市',
			price: '$139',
			text: 'Modern hotel in the heart of Osaka',
		},
		{
			id: 4,
			pic: hours,
			name: '9 Hours Shinjuku',
			price: '$59',
			text: 'A convenient capsule hotel at Shinjuku station',
		},
	];

	const experienceitems = [
		{
			id: 1,
			pic: nihon,
			name: 'Nihon Kimono',
			price: '$89',
			text: 'Wear the national dress of Japan around the city',
		},
		{
			id: 2,
			pic: teamlab,
			name: 'teamLab Borderless',
			price: '$39',
			text: 'A modern sensory experience of light and sound',
		},
	];

	return (
		<>
			<LoginHeader />

			<main>
				<section>
					<div className='max-w-[1342px]  w-full mx-auto px-5 '>
						<div className='flex justify-between'>
							{/* left side */}
							<div className='w-[756px]'>
								{isOpen && (
									<div className='w-[704px] flex items-center mb-10 py-4 pe-4 ps-6 border border-[#007B65] text-[#007B65] rounded-[8px] bg-[#EAFFFB]  '>
										<span>
											Your flight has been booked successfully! Your
											confirmation number is #381029404387
										</span>
										<Image
											src={close}
											alt='close'
											onClick={() => setIsOpen(false)}
											className='cursor-pointer'
										/>
									</div>
								)}

								<h1 className='text-[#605DEC] text-2xl font-bold mb-4 '>
									Bon voyage, Sophia!
								</h1>
								<span className='text-[#6E7491] text-[18px] font-semibold mb-4 inline-block '>
									Confirmation number: #381029404387
								</span>
								<p className='text-[#7C8DB0] text-[18px] mb-14 '>
									Thank you for booking your travel with Tripma! Below is a
									summary of your trip to Narita airport in Tokyo, Japan. We’ve
									sent a copy of your booking confirmation to your email
									address. You can also find this page again in{' '}
									<a href='' className='text-[#605DEC]'>
										My trips.
									</a>{' '}
								</p>

								<h2 className='text-[#6E7491] text-2xl font-bold mb-4 '>
									Flight summary
								</h2>

								<p className='text-[#6E7491] text-[18px] font-semibold mb-4 '>
									Departing February 25th, 2021
								</p>
								{selectedDepartFlight && (
									<div className='border border-[#E9E8FC] rounded-xl  flex flex-col gap-3 '>
										<SelectedSeatsSummary {...selectedDepartFlight} />
									</div>
								)}
								<span className='text-[#7C8DB0] inline-block mb-10 '>
									Seat 9F (economy, window), 1 checked bag
								</span>

								<p className='text-[#6E7491] text-[18px] font-semibold mb-4 '>
									Arriving March 21st, 2021{' '}
								</p>
								{selectedReturnFlight && (
									<div className='border border-[#E9E8FC] rounded-xl  flex flex-col gap-3 '>
										<SelectedSeatsSummary {...selectedReturnFlight} />
									</div>
								)}
								<span className='text-[#7C8DB0] inline-block mb-14 '>
									Seat 4F (business, window), 1 checked bag
								</span>

								<Table className='w-[400px] '>
									<TableCaption className='text-[#6E7491] text-2xl font-bold mb-4 text-left '>
										Price breakdown
									</TableCaption>

									<TableBody className='w-[400px]  '>
										<TableRow className='text-[#6E7491] text-[18px] mb-3 border-b-0 '>
											<TableCell>Departing Flight</TableCell>
											<TableCell>$251.50</TableCell>
										</TableRow>
										<TableRow className='text-[#6E7491] text-[18px] mb-3 border-b-0 '>
											<TableCell>Arriving Flight</TableCell>
											<TableCell>$251.50</TableCell>
										</TableRow>
										<TableRow className='text-[#6E7491] text-[18px] mb-3 border-b-0 '>
											<TableCell>Baggage fees</TableCell>
											<TableCell>$0</TableCell>
										</TableRow>
										<TableRow className='text-[#6E7491] text-[18px] mb-3 border-b-0 '>
											<TableCell>Seat upgrade (business)</TableCell>
											<TableCell>$199</TableCell>
										</TableRow>
										<TableRow className='text-[#6E7491] text-[18px] mb-3 border-b-0 '>
											<TableCell>Subtotal</TableCell>
											<TableCell>$702</TableCell>
										</TableRow>
										<TableRow className='text-[#6E7491] text-[18px] mb-3 border-b-0 '>
											<TableCell>Taxes (9.4%)</TableCell>
											<TableCell>$66</TableCell>
										</TableRow>
									</TableBody>
									<TableFooter>
										<TableRow className='text-[#36374A] text-[18px] mb-3 border-b-0 '>
											<TableCell>Amount paid</TableCell>
											<TableCell className='text-right'>$768</TableCell>
										</TableRow>
									</TableFooter>
								</Table>

								<h2 className='text-[#6E7491] text-2xl font-bold mb-4 '>
									Payment method
								</h2>
								<div>
									<Image src={visa} alt='visa' />
									<strong>Sophia Knowles</strong>
									<div>
										<span>••••••••••••3456</span>
										<span>10/23</span>
									</div>
								</div>

								<h2 className='text-[#6E7491] text-2xl font-bold mb-4 '>
									Share your travel itinerary
								</h2>
								<p>
									You can email your itinerary to anyone by entering their email
									address here.
								</p>
								<form action=''>
									<Input placeholder='Email address' />

									<div>
										<Button>Email itinerary</Button>
										<Button>Add another</Button>
									</div>
								</form>

								<h2 className='text-[#6E7491] text-2xl font-bold mb-4 '>
									Flight Route
								</h2>
								<Image src={map} alt='' />
							</div>

							{/* right side */}
							<div className='w-[400px]  '>
								<h2 className='text-[#6E7491] text-2xl font-bold mb-4 '>
									Shop hotels
								</h2>
								<p>
									Tripma partners with thousands of hotels to get you the best
									deal. Save up to 30% when you add a hotel to your trip.
								</p>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
