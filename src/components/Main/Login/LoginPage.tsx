'use client';
import Image from 'next/image';

import go from '@/app/assets/images/departure.svg';
import arrive from '@/app/assets/images/arrival.svg';
import calendar from '@/app/assets/images/calendar-with-dates.svg';
import user from '@/app/assets/images/person-solid.svg';
import bg from '@/app/assets/images/hero-login-bg.jpg';
import increment from '@/app/assets/images/Increment.svg';
import decrement from '@/app/assets/images/inc.svg';
import LoginCookies from './LoginCookies';
import { useState } from 'react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
	const [open, setOpen] = useState(false);
	// const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
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

	const router = useRouter();
	
	const handleNavigate = () => {
		router.push('/detail')
	}
	
	return (
		<>
			<section
				style={{
					backgroundImage: `url(${bg.src})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'top center',
				}}
				className='h-screen relative'
			>
				<div className='max-w-[1342px] w-full mx-auto px-5  '>
					<div className=' pt-[135px] w-[756px] mx-auto'>
						<h1 className='text-[95px] text-center font-extrabold leading-24 bg-gradient-to-r from-[#62ACFD] via-[#893FFD]  to-[#5CA1FD]  text-transparent bg-clip-text  mb-[68px]'>
							It’s more than just a trip
						</h1>
					</div>
					<form
						action=''
						className='flex items-center justify-center mb-5 rounded w-fit border border-[#CBD4E6] bg-white  mx-auto '
						style={{
							boxShadow:
								'0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
						}}
					>
						{/* go */}
						<Select>
							<SelectTrigger
								className=' w-[324.5px] ps-[52px] bg-white py-[10px] pe-2 text-left  text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px] border-e border-[#CBD4E6] appearance-none outline-0 '
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
								className=' w-[324.5px] ps-[52px] bg-white py-[10px] pe-2 text-left  text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px] border-e border-[#CBD4E6] appearance-none outline-0 '
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
									className='w-[252px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0] text-[18px] border-e border-[#CBD4E6] outline-0 cursor-pointer  bg-white'
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
							className=' relative w-[200px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0]  text-[18px] outline-0 '
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
						<Button onClick={handleNavigate}  className='w-[96px] text-center text-[#FAFAFA] p-3 bg-[#605DEC] rounded cursor-pointer '>
							Search
						</Button>
					</form>


					<LoginCookies />
				</div>
			</section>
		</>
	);
}
