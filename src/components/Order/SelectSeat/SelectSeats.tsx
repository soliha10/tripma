'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import menu from '@/app/assets/images/menu.svg';
import logo from '@/app/assets/images/Wordmark.svg';
import arrow from '@/app/assets/images/arrow-white.svg';
import economy from '@/app/assets/images/Economy Seats.svg';
import busines from '@/app/assets/images/Business Seats.svg';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import check from '@/app/assets/images/check heavy.svg';
import point from '@/app/assets/images/point heavy.svg';
import chevron from '@/app/assets/images/chevron.svg';
import { useFlight } from '@/context/FlightContext';
import SeatMap from './SeatMap';
import bgPlane from '@/app/assets/images/bg-plane.svg';
import SelectModal from './SelectModal';

export default function SelectSeats() {
	// const [isSelectedDepart, setIsSelectDepart] = useState(false);
	// const [isSelectedReturn, setIsSelectReturn] = useState(false);

	const [selectTab, setSelectTab] = useState<'depart' | 'return'>('depart');

	const { passenger } = useFlight();
	const economyItem = [
		'Built-in entertainment system',
		'Complimentary snacks and drinks',
		'One free carry-on and personal item',
	];
	const businessItem = [
		'Extended leg room',
		'First two checked bags free',
		'Priority boarding',
		'Personalized service',
		'Enhanced food and drink service',
		'Seats that recline 40% more than economy',
	];

	const router = useRouter();

	const toggleDepart = () => setSelectTab('depart');
	const toggleReturn = () => setSelectTab('return');
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedSeatDepart, setSelectedSeatDepart] = useState<{
		row: number;
		col: string;
	} | null>(null);
	const [selectedSeatReturn, setSelectedSeatReturn] = useState<{
		row: number;
		col: string;
	} | null>(null);

	const handleBtn = () =>
		selectTab === 'depart' ? setSelectTab('return') : setSelectTab('depart');
	const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		router.push('/payment');
	};
	return (
		<section>
			<div className='max-w-[1440px]  w-full mx-auto px-3 '>
				<div className='flex overflow-hidden h-screen  '>
					{/* left side */}
					<div className='w-full overflow-y-auto h-full scrollbar-hide '>
						<div className='flex items-center py-[21px] gap-3  '>
							<Button className='w-8 h-8'>
								<Image src={menu} alt='btn' />
							</Button>

							<a href=''>
								<Image src={logo} alt='pic' />
							</a>
						</div>
						<div className='w-full overflow-hidden relative '>
							<Image
								src={bgPlane}
								alt='plane'
								className='relative left-[-310px] '
							/>
							<SeatMap
								selectedSeat={
									selectTab === 'depart'
										? selectedSeatDepart
										: selectedSeatReturn
								}
								setSelectedSeat={
									selectTab === 'depart'
										? setSelectedSeatDepart
										: setSelectedSeatReturn
								}
								section={selectTab}
								onBusinessSelect={() => setIsOpenModal(true)} // 👈 Modalni och
							/>
						</div>
					</div>

					{/* right side */}
					<div className='w-[712px] border-s border-[#CBD4E6]  overflow-y-auto h-full  backdrop-blur-md scrollbar-hide fixed right-[24px] '>
						<div className='bg-[#27273F] text-[#FAFAFA] flex items-center '>
							<div className='py-5 px-6 flex flex-col w-[129px]'>
								<strong className='text-2xl font-extrabold '>SFO</strong>
								<span className='text-xs text-[#E9E8FC] '>California,US</span>
							</div>

							<Image src={arrow} alt='pic' />

							<div className='py-5 px-6 flex flex-col w-[129px]'>
								<strong className='text-2xl font-extrabold '>NRT</strong>
								<span className='text-xs text-[#E9E8FC] '>Tokyo,Japan</span>
							</div>

							<div
								onClick={toggleDepart}
								className={`py-5 px-6 flex flex-col w-[210px]  ${
									selectTab === 'depart'
										? 'bg-[#605DEC] relative'
										: 'bg-transparent'
								} `}
							>
								<time>Feb 25 | 7:00AM</time>
								<span className='text-xs'>Departing</span>
								{selectTab === 'depart' && (
									<Image
										src={chevron}
										alt='pic'
										className='absolute bottom-0 left-[45%] '
									/>
								)}
							</div>

							<div
								onClick={toggleReturn}
								className={`py-5 px-6 flex flex-col w-[210px]  ${
									selectTab === 'return'
										? 'bg-[#605DEC] relative'
										: 'bg-transparent'
								} `}
							>
								<time>Mar 21 | 12:15PM</time>
								<span className='text-xs'>Arriving</span>
								{selectTab === 'return' && (
									<Image
										src={chevron}
										alt='pic'
										className='absolute bottom-0 left-[45%] '
									/>
								)}
							</div>
						</div>

						<div className='flex p-2 gap-1   pt-2 px-4 mb-[78px] '>
							{/* economy */}
							<div className='pt-8 w-[335px] '>
								<Image src={economy} alt='economy' className='mb-4' />
								<div className='pt-4 px-8 pb-8 '>
									<div className='flex items-center gap-4 mb-4'>
										<h3 className='text-[#6E7491] text-[18px] font-semibold '>
											Economy
										</h3>
										<span
											className='w-[69px] py-1 inline-block font-bold text-white text-[14px] text-center rounded '
											style={{
												backgroundImage:
													'linear-gradient(180deg, #605DEC 0%, #2A26D9 100%)',
											}}
										>
											Selected
										</span>
									</div>
									<p className='text-[#7C8DB0] mb-4 text-[14px] '>
										Rest and recharge during your flight with extended leg room,
										personalized service, and a multi-course meal service
									</p>
									<span className='inline-block  bg-[#605DEC] w-8 h-1 opacity-50 mb-4 '></span>

									<ul className='flex flex-col gap-4'>
										{economyItem.map((item, index) => (
											<li
												key={index}
												className='flex items-center gap-3 text-[#6E7491] text-[14px] '
											>
												<Image src={point} alt='' />
												<p>{item}</p>
											</li>
										))}
									</ul>
								</div>
							</div>

							{/* bussiness */}
							<div className='pt-8 w-[335px] '>
								<Image src={busines} alt='economy' className='mb-4' />
								<div className='pt-4 px-8 pb-8 '>
									<h3 className='text-[#6E7491] text-[18px] font-semibold mb-4 '>
										Business class
									</h3>

									<p className='text-[#7C8DB0] mb-4 text-[14px] '>
										Rest and recharge during your flight with extended leg room,
										personalized service, and a multi-course meal service
									</p>
									<span className='inline-block  bg-[#5CD6C0] w-8 h-1 opacity-50 mb-4 '></span>

									<ul className='flex flex-col gap-4'>
										{businessItem.map((item, index) => (
											<li
												key={index}
												className='flex items-center gap-3 text-[#6E7491] text-[14px] '
											>
												<Image src={check} alt='' />
												<p>{item}</p>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						{/* footer */}
						<div className='bg-[#FAFAFE] flex items-center gap-4 py-6 px-4 border-t border-e border-[#CBD4E6] '>
							<div className='flex flex-col gap-1 w-[176px] p-2 '>
								<span className='text-[#7C8DB0] text-[14px] '>Passenger 1</span>
								<strong className='text-[#6E7491] font-semibold text-[18px] '>
									{passenger?.firstName} {passenger?.lastName}
								</strong>
							</div>
							<div className='flex flex-col gap-1 w-[176px] p-2 '>
								<span className='text-[#7C8DB0] text-[14px] '>Seat number</span>
								{/* <strong className='text-[#6E7491] font-semibold text-[18px] '>
									--
								</strong> */}
								<strong>
									{selectTab === 'depart'
										? selectedSeatDepart
											? `${selectedSeatDepart.row}${selectedSeatDepart.col}`
											: '--'
										: selectedSeatReturn
										? `${selectedSeatReturn.row}${selectedSeatReturn.col}`
										: '--'}
								</strong>
							</div>

							<Button className='text-[#605DEC] border border-[#605DEC] w-[148px]  rounded py-3  inline-block hover:bg-[#605DEC] lg:text-base hover:text-white cursor-pointer'>
								Go Back
							</Button>

							<Button
								className={`w-[163px] py-3 text-base rounded ${
									(selectTab === 'depart' && selectedSeatDepart) ||
									(selectTab === 'return' && selectedSeatReturn)
										? 'bg-[#605DEC] text-white'
										: 'border-[#7C8DB0] text-[#7C8DB0] bg-[#cbd4e64c] cursor-not-allowed opacity-100'
								} ${selectedSeatDepart && selectedSeatReturn && 'hidden'} `}
								disabled={
									!(
										(selectTab === 'depart' && selectedSeatDepart) ||
										(selectTab === 'return' && selectedSeatReturn)
									)
								}
								onClick={handleBtn}
							>
								Next flight
							</Button>
							{selectedSeatDepart && selectedSeatReturn && (
								<Button onClick={handleNavigate} variant={'cancel'} size={'cancel'} className='w-[163px]'>Payment Method</Button>
							)}
						</div>
					</div>

					{isOpenModal && <SelectModal onClose={() => setIsOpenModal(false)} />}
				</div>
			</div>
		</section>
	);
}
