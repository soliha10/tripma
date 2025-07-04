'use client';
import arrow from '@/app/assets/images/chevron-down.svg';

import Image from 'next/image';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Calendar } from '../../ui/calendar';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import go from '@/app/assets/images/departure.svg';
import arrive from '@/app/assets/images/arrival.svg';
import calendar from '@/app/assets/images/calendar-with-dates.svg';
import user from '@/app/assets/images/person-solid.svg';
import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';
import map from '@/app/assets/images/Map.svg';
import { DepartingFlight, flights } from './DepartingFlight';
import { Button } from '@/components/ui/button';
import Price from './Price';
import priceGraph from '@/app/assets/images/Price History.svg';
import SelectedItem from './SelectedItem';

export default function DetailHero() {
	const [{ id, pic, duration, airlineType, time, stopDuration }] = flights;
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const goOptions = ['SFO', 'ATL', 'LAX', 'STL', 'PVG', 'MSP', 'NRT', 'JFK'];
	const arriveOptions = [
		'NRT',
		'PVG',
		'STL',
		'ATL',
		'MSP',
		'SFO',
		'JFK',
		'LAX',
	];
	const [tripType, setTripType] = useState<'round' | 'one'>('round');
	const [isCountOpen, setIsCountOpen] = useState(false);
	const [adultCount, setAdultCount] = useState(1);
	const [minorCount, setMinorCount] = useState(0);

	const toggle = () => {
		setIsCountOpen((prev) => !prev);
	};

	return (
		<section>
			<div className='max-w-[1342px] w-full mx-auto px-5  '>
				<div className='pb-[80px]'>
					<form
						action=''
						className='flex items-center justify-start mb-6 rounded  w-fit ms-0  border border-[#CBD4E6] bg-white  mx-auto '
						style={{
							boxShadow:
								'0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
						}}
					>
						{/* go */}
						<Select>
							<SelectTrigger
								className=' w-[174px] ps-[52px] bg-white py-[10px] pe-2 text-left  text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px] border-e border-[#CBD4E6] appearance-none outline-0 '
								style={{
									backgroundImage: `url(${go.src})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '32px, 32px',
									backgroundPosition: '8px center',
								}}
							>
								<SelectValue placeholder='From where?' />
							</SelectTrigger>

							<SelectContent
								className='rounded-[8px] w-[300px] h-[312px] ms-6 flex flex-col gap-2 bg-white p-4  '
								style={{
									boxShadow:
										'0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
								}}
							>
								{goOptions.map((item, index) => (
									<SelectItem
										key={index}
										value={item}
										className='hover:bg-[#605DEC] w-full mb-2 z-10  text-base  focus:bg-[#605DEC] focus:text-white'
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* arrive */}
						<Select>
							<SelectTrigger
								className=' w-[174px] ps-[52px] bg-white py-[10px] pe-2 text-left  text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px] border-e border-[#CBD4E6] appearance-none outline-0 '
								style={{
									backgroundImage: `url(${arrive.src})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '32px, 32px',
									backgroundPosition: '8px center',
								}}
							>
								<SelectValue placeholder='Where to?' />
							</SelectTrigger>

							<SelectContent
								className='rounded-[8px] w-[300px] h-[312px] ms-6 flex flex-col gap-2 bg-white p-4  '
								style={{
									boxShadow:
										'0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
								}}
							>
								{arriveOptions.map((item, index) => (
									<SelectItem
										key={index}
										value={item}
										className='hover:bg-[#605DEC] w-full mb-2 z-10  text-base  focus:bg-[#605DEC] focus:text-white'
									>
										{item}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{/* date */}

						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<div
									onClick={() => setOpen(true)}
									className='w-[228px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0] text-[18px] border-e border-[#CBD4E6] outline-0 cursor-pointer  bg-white'
									style={{
										backgroundImage: `url(${calendar.src})`,
										backgroundRepeat: 'no-repeat',
										backgroundSize: '32px 32px',
										backgroundPosition: '8px center',
									}}
								>
									{dateRange?.from && dateRange?.to ? (
										`${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
									) : (
										<span className='text-[#7C8DB0]'>Depart - Return</span>
									)}
								</div>
							</PopoverTrigger>
							<PopoverContent
								className='w-[626px] pb-8 px-0 overflow-hidden '
								align='start'
							>
								<form className='flex pt-1 px-6 pb-5 items-center border-b border-[#CBD4E6] '>
									<label htmlFor='' className='me-3 flex items-center'>
										<input
											name='tripType'
											id=''
											type='radio'
											value='radio'
											checked={tripType === 'round'}
											onChange={() => setTripType('round')}
										/>

										<span className='text-[#6E7491] lg:text-[14px] ms-2 '>
											Round trip
										</span>
									</label>
									<label htmlFor='' className='me-[46px] flex items-center '>
										<input
											name='tripType'
											id=''
											type='radio'
											value='one'
											checked={tripType === 'one'}
											onChange={() => setTripType('one')}
										/>

										<span className='text-[#6E7491] lg:text-[14px] ms-2'>
											One way
										</span>
									</label>
									<div
										onClick={() => setOpen(true)}
										className='w-[252px] ps-[52px] border-2  me-2 py-2 pe-2 text-[#7C8DB0] text-[18px]  rounded border-[#605DEC] outline-0 cursor-pointer  bg-white'
										style={{
											backgroundImage: `url(${calendar.src})`,
											backgroundRepeat: 'no-repeat',
											backgroundSize: '32px 32px',
											backgroundPosition: '8px center',
										}}
									>
										{dateRange?.from && dateRange?.to ? (
											`${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`
										) : (
											<span className='text-[#7C8DB0]'>Depart - Return</span>
										)}
									</div>
									<button className='bg-[#605DEC] w-[84px] text-[#FAFAFA] lg:text-[18px] py-3 rounded '>
										Done
									</button>
								</form>
								<Calendar
									mode='range'
									defaultMonth={dateRange?.from}
									numberOfMonths={2}
									selected={dateRange}
									onSelect={setDateRange}
									className='rounded-lg w-[480px]  shadow-0 px-0 pt-6 mx-auto  '
								/>
							</PopoverContent>
						</Popover>
						{/* count */}
						<div
							className=' relative w-[174px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0]  text-[18px] outline-0 '
							style={{
								backgroundImage: `url(${user.src})`,
								backgroundRepeat: 'no-repeat',
								backgroundSize: '32px, 32px',
								backgroundPosition: '8px center',
							}}
							onClick={toggle}
						>
							{adultCount} adult{adultCount > 1 ? 's' : ''}{' '}
							{minorCount > 0 ? `${minorCount} minor` : ''}
							{isCountOpen && (
								<div
									className='w-[232px] absolute bottom-[-110px] bg-white left-6 p-4 lg:text-base rounded-md border border-[#CBD4E6] '
									onClick={(e) => e.stopPropagation()}
									style={{
										boxShadow:
											' 0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
									}}
								>
									<div className='flex items-center justify-between mb-2'>
										<span>Adults:</span>
										<div className='flex items-center gap-4'>
											<button
												type='button'
												onClick={() =>
													setAdultCount((prev) => (prev > 1 ? prev - 1 : 1))
												}
											>
												<Image src={decrement} alt='' />
											</button>
											<span className='text-[18px]'>{adultCount}</span>
											<button
												type='button'
												onClick={() => setAdultCount((prev) => prev + 1)}
											>
												<Image src={increment} alt='' />
											</button>
										</div>
									</div>
									<div className='flex items-center justify-between'>
										<span>Minors:</span>
										<div className='flex items-center gap-4'>
											<button
												type='button'
												onClick={() =>
													setMinorCount((prev) => (prev >= 1 ? prev - 1 : 0))
												}
											>
												<Image src={decrement} alt='' />
											</button>
											<span className='text-[18px]'>{minorCount}</span>
											<button
												type='button'
												onClick={() => setMinorCount((prev) => prev + 1)}
											>
												<Image src={increment} alt='' />
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
						<button className='w-[96px] text-center text-[#FAFAFA] p-3 bg-[#605DEC] rounded cursor-pointer '>
							Search
						</button>
					</form>

					<div className='flex gap-4 items-center mb-12'>
						<Select>
							<SelectTrigger
								className='w-[120px] border text-left border-[#CBD4E6] rounded  ps-4 pe-3  py-2 text-[#27273F] outline-none '
								style={{
									backgroundImage: `url(${arrow})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '30px 30px',
									backgroundPosition: 'right 10px',
								}}
							>
								<SelectValue placeholder='Max price' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Max price</SelectItem>
									<SelectItem value='banana'>Min price</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger
								className='w-[95px] border text-left border-[#CBD4E6] rounded  ps-4 pe-3  py-2 text-[#27273F] outline-none '
								style={{
									backgroundImage: `url(${arrow})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '30px 30px',
									backgroundPosition: 'right 10px',
								}}
							>
								<SelectValue placeholder='Shops' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Shops</SelectItem>
									<SelectItem value='banana'>Cafes</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger
								className='w-[95px] border text-left border-[#CBD4E6] rounded  ps-4 pe-3  py-2 text-[#27273F] outline-none '
								style={{
									backgroundImage: `url(${arrow})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '30px 30px',
									backgroundPosition: 'right 10px',
								}}
							>
								<SelectValue placeholder='Times' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Morning</SelectItem>
									<SelectItem value='banana'>Afternoon</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger
								className='w-[105px] border text-left border-[#CBD4E6] rounded  ps-4 pe-3  py-2 text-[#27273F] outline-none '
								style={{
									backgroundImage: `url(${arrow})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '30px 30px',
									backgroundPosition: 'right 10px',
								}}
							>
								<SelectValue placeholder='Airlines' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Airlines</SelectItem>
									<SelectItem value='banana'>Airlines</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger
								className='w-[123px] border text-left border-[#CBD4E6] rounded  ps-4 pe-3  py-2 text-[#27273F] outline-none '
								style={{
									backgroundImage: `url(${arrow})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '30px 30px',
									backgroundPosition: 'right 10px',
								}}
							>
								<SelectValue placeholder='Seat class' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>Seat class</SelectItem>
									<SelectItem value='banana'>Seat class</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger
								className='w-[87px] border text-left border-[#CBD4E6] rounded  ps-4 pe-3  py-2 text-[#27273F] outline-none '
								style={{
									backgroundImage: `url(${arrow})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '30px 30px',
									backgroundPosition: 'right 10px',
								}}
							>
								<SelectValue placeholder='More' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='apple'>More</SelectItem>
									<SelectItem value='banana'>School</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className='flex justify-between items-start'>
						{/* LEFT SIDE */}
						<div className='w-[872px]'>
							<DepartingFlight />
							<Button className='border-[#605DEC] text-[#605DEC] bg-white border hover:bg-[#605DEC] ms-auto block lg:text-[18px] py-3 hover:text-white cursor-pointer mb-12 '>
								Show all flights
							</Button>
							<Image src={map} alt='map' />
						</div>
						{/* RIGHT SIDE */}
						<div className='w-[400px] mt-[57px] '>
							<SelectedItem
								id={id}
								pic={pic}
								duration={duration}
								airlineType={airlineType}
								time={time}
								stopDuration={stopDuration}
							/>
							<div className='p-4 text-right gap-2 flex flex-col text-[#27273F] font-semibold mb-8 '>
								<div>
									<span className='inline-block me-10 '>Subtotal</span>
									<span>$503</span>
								</div>
								<div>
									<span className='inline-block me-10 '>Taxes and Fees</span>
									<span>$503</span>
								</div>
								<div>
									<span className='inline-block me-10 '>Total</span>
									<span>$503</span>
								</div>
							</div>
							<Button className='text-[#605DEC] border border-[#605DEC] w-[180px] text-[18px] rounded py-3 ms-auto block hover:bg-[#605DEC] lg:text-[18px]  hover:text-white cursor-pointer'>
								Save and Close
							</Button>
						</div>

						<div className='w-[400px] hidden'>
							<Price />

							<div className='mb-10'>
								<strong className='text-[#6E7491] mb-4 inline-block text-[18px] font-semibold'>
									Price history
								</strong>
								<Image src={priceGraph} alt='graph' />
							</div>

							<div>
								<strong className='text-[#6E7491] text-[18px] font-semibold inline-block me-4 '>
									Price rating
								</strong>
								<span className='w-[84px] bg-[#5CD6C0] rounded py-1 mb-[15px] text-white inline-block text-center '>
									Buy soon
								</span>

								<p className='text-[#6E7491] lg:text-base mb-4 '>
									We recommend booking soon. The average cost of this flight is
									$750, but could rise 18% to $885 in two weeks.
								</p>
								<p className='text-[#A1B0CC]'>
									Tripma analyzes thousands of flights, prices, and trends to
									ensure you get the best deal.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
