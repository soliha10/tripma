'use client';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';
import card from '@/app/assets/images/credit card.svg';
import googlePay from '@/app/assets/images/google.svg';
import applePay from '@/app/assets/images/apple.svg';
import paypal from '@/app/assets/images/paypal.svg';
import crypto from '@/app/assets/images/bitcoin money currency crypto.svg';
import Image from 'next/image';
import google from '@/app/assets/images/color.svg';
import apple from '@/app/assets/images/apple mac.svg';
import facebook from '@/app/assets/images/facebook.svg';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Email from '../Main/Login/Email';
import { Button } from '../ui/button';
import SelectedItem from '../Details/DetailHero/SelectedItem';
import { useFlight } from '@/context/FlightContext';
export default function PaymentMethod() {
	const { selectedDepartFlight, selectedReturnFlight } = useFlight();

	const emails = [
		{
			id: 1,
			pic: google,
			text: 'Continue with Google',
		},
		{
			id: 2,
			pic: apple,
			text: 'Continue with Apple',
		},
		{
			id: 3,
			pic: facebook,
			text: 'Continue with Facebook',
		},
	];
	const payTypes = [
		{ pic: card, name: 'Credit card' },
		{ pic: googlePay, name: 'Google Pay' },
		{ pic: applePay, name: 'Apple pay' },
		{ pic: paypal, name: 'Paypal' },
		{ pic: crypto, name: 'Crypto' },
	];
	return (
		<>
			<LoginHeader />

			<main>
				<section>
					<div className='max-w-[1342px]  w-full mx-auto px-5 '>
						<div className='flex items-start justify-between pt-[56px] pb-[104px]'>
							{/* left side */}
							<div className='lg:w-[682px]  '>
								<h2 className='text-[#605DEC] text-2xl font-bold mb-4  '>
									Payment method
								</h2>
								<p className='text-[#7C8DB0] text-[18px] mb-6 '>
									Select a payment method below. Tripma processes your payment
									securely with end-to-end encryption.
								</p>

								<ul className='flex items-center border border-[#605DEC] text-[#605DEC] mb-10 text-[17px] rounded '>
									{payTypes.map(({ pic, name }, index) => (
										<li
											key={index}
											className='flex items-center px-5 py-3 gap-1 '
										>
											<Image src={pic} alt='name' />
											<span>{name}</span>
										</li>
									))}
								</ul>

								<div>
									<h3 className='text-[#6E7491] text-[18px] font-semibold mb-7'>
										Credit card details
									</h3>
									<form action=''>
										<div className='flex items-center gap-2 mb-6'>
											<Input type='checkbox' className='w-4 h-4' />
											<Label className='text-[#6E7491] '>
												Billing address is same as Passenger 1{' '}
											</Label>
										</div>
										<Input
											placeholder='Name on card'
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-6 p-3 '
										/>
										<Input
											placeholder='Card number'
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-6 p-3 '
										/>
										<div className='flex items-start mb-10'>
											<div>
												<Input
													placeholder='Expiration date'
													className=' lg:w-[240px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] mb-[6px] placeholder:text-[18px] text-[18px] me-6 p-3 '
												/>
												<span className='text-[#7C8DB0] text-xs '>MM/YY</span>
											</div>
											<Input
												placeholder='CCV'
												className=' lg:w-[216px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px]  p-3 '
											/>
										</div>
									</form>
								</div>

								<div>
									<h3 className='text-[#6E7491] text-[18px] font-semibold mb-4 '>
										Create an account
									</h3>
									<p className='text-[#7C8DB0] mb-7 '>
										Tripma is free to use as a guest, but if you create an
										account today, you can save and view flights, manage your
										trips, earn rewards, and more.
									</p>
									<form action=''>
										<div className='flex items-center gap-2 mb-7'>
											<Input type='checkbox' className='w-4 h-4' />
											<Label className='text-[#6E7491]'>
												Save card and create account for later
											</Label>
										</div>
										<Input
											placeholder='Email address or phone number'
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-6 p-3 '
										/>
										<Input
											placeholder='Password'
											type='password'
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-[50px] p-3 '
										/>
										<div className='flex items-center gap-[10px] mb-6 '>
											<span className='h-[1px] bg-[#CBD4E6] w-[226px] '></span>
											<span className='text-[#7C8DB0] text-[18px] '>or</span>
											<span className='h-[1px] bg-[#CBD4E6] w-[226px] '></span>
										</div>
										<ul className='flex items-center flex-col gap-3 w-[480px] mb-12 '>
											{emails.map(({ id, pic, text }) => (
												<Email key={id} pic={pic} text={text} id={id} />
											))}
										</ul>
									</form>
								</div>

								<div>
									<h3 className='text-[#6E7491] text-[18px] font-semibold mb-4 '>
										Cancellation policy
									</h3>
									<p className='text-[#7C8DB0] mb-14  '>
										This flight has a flexible cancellation policy. If you
										cancel or change your flight up to 30 days before the
										departure date, you are eligible for a free refund. All
										flights booked on Tripma are backed by our satisfaction
										guarantee, however cancellation policies vary by airline.
										See the
										<a className='text-[#605DEC]  ' href=''>  full cancellation policy </a>
										  for this flight.
									</p>
									<div>
										<Button
											variant={'cancel'}
											className='w-[191px] me-6 text-[18px]  '
										>
											Back to seat select
										</Button>
										<Button
											variant={'upgrade'}
											className='border border-[#7C8DB0] py-3 text-[#7C8DB0] bg-[#cbd4e64c] text-[18px] cursor-not-allowed opacity-100'
											disabled
										>
											Confirm and pay
										</Button>
									</div>
								</div>
							</div>

							{/* right side */}

							<div className='mt-[110px] '>
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
										<span className='inline-block me-10 '>Taxes and Fees</span>
										<span>$503</span>
									</div>
									<div>
										<span className='inline-block me-10 '>Total</span>
										<span>$503</span>
									</div>
								</div>
								<Button
									variant={'upgrade'}
									className='border border-[#7C8DB0] py-3 text-[#7C8DB0] bg-[#cbd4e64c] text-[18px] block ms-auto cursor-not-allowed opacity-100'
									disabled
								>
									Confirm and pay
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
