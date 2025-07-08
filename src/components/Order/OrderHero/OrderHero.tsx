'use client';
import Footer from '@/components/Main/Footer/Footer';
import LoginHeader from '@/components/Main/Login/LoginHeader';
import OrderForm from './OrderForm';
import Image from 'next/image';
import bags from '@/app/assets/images/bags.svg';
import { useFlight } from '@/context/FlightContext';
import SelectedItem from '@/components/Details/DetailHero/SelectedItem';
import { Button } from '@/components/ui/button';
export default function OrderHero() {
	const { selectedDepartFlight, selectedReturnFlight } = useFlight();
	return (
		<>
			<LoginHeader />
			<section>
				<div className='max-w-[1342px] w-full mx-auto px-5 pb-14  '>
					<div className='pt-[56px]'>
						<div className='mb-[36px] lg:w-[682px]'>
							<h1 className='text-[#605DEC] text-2xl font-bold mb-4 '>
								Passenger information
							</h1>
							<p className='text-[#7C8DB0] text-[18px] '>
								Enter the required information for each traveler and be sure
								that it exactly matches the government-issued ID presented at
								the airport.
							</p>
						</div>
						<div className='flex justify-between'>
							<OrderForm />

							<div>
								<div className={`w-[400px] mt-[57px]   `}>
									{selectedDepartFlight && (
										<div className='border border-[#E9E8FC] rounded-xl px-4 pt-4 flex flex-col gap-3 '>
											<SelectedItem {...selectedDepartFlight} />
										</div>
									)}
									{selectedReturnFlight && (
										<div className='border border-[#E9E8FC] rounded-xl px-4 pt-4 flex flex-col gap-3 '>
											<SelectedItem {...selectedReturnFlight} />
										</div>
									)}

									<div className='p-4 text-right gap-2 flex flex-col text-[#27273F] font-semibold mb-8 '>
										<div>
											<span className='inline-block me-10 '>Subtotal</span>
											<span>$503</span>
										</div>
										<div>
											<span className='inline-block me-10 '>
												Taxes and Fees
											</span>
											<span>$503</span>
										</div>
										<div>
											<span className='inline-block me-10 '>Total</span>
											<span>$503</span>
										</div>
									</div>

									<Button className='w-[138px] mb-[104px] text-[#7C8DB0] border block ms-auto border-[#7C8DB0] cursor-pointer py-3 bg-[#cbd4e64c]  rounded text-[18px]  '>
										Select seats
									</Button>
								</div>

								<Image src={bags} alt='' />
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}
