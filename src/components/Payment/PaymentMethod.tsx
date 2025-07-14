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
import { useState } from 'react';
import info from '@/app/assets/images/information.svg';
import { FiEye } from 'react-icons/fi';
// import eye from "@/app/assets/images/eye show visible.svg"
import { FiEyeOff } from 'react-icons/fi';
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
	const [cardName, setCardName] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [cardExpiraDate, setCardExpireDate] = useState('');
	const [cardCVV, setCardCVV] = useState('');
	const [accountEmail, setAccountEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const [checked, setChecked] = useState(false);
	const [checkedSave, setCheckedSave] = useState(false);

	const getPasswordStrength = () => {
		if (password.length >= 14) return 'Strong';
		if (password.length >= 8) return 'Weak';
		return 'Too short';
	};

	const strength = getPasswordStrength();

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
											<Input
												type='checkbox'
												checked={checked}
												onClick={() => setChecked(!checked)}
												className={`w-4 h-4 appearance-none border-2 border-[#6E7491] p-1 ${
													checked === true ? 'bg-[#605DEC]' : ''
												}`}
											/>
											<Label className='text-[#6E7491] '>
												Billing address is same as Passenger 1{' '}
											</Label>
										</div>
										<Input
											placeholder='Name on card'
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-6 p-3 '
											onChange={(e) => setCardName(e.target.value)}
										/>
										<Input
											placeholder='Card number'
											onChange={(e) => setCardNumber(e.target.value)}
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-6 p-3 '
										/>
										<div className='flex items-start mb-10'>
											<div>
												<Input
													placeholder='Expiration date'
													onChange={(e) => setCardExpireDate(e.target.value)}
													className=' lg:w-[240px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] mb-[6px] placeholder:text-[18px] text-[18px] me-6 p-3 '
												/>
												<span className='text-[#7C8DB0] text-xs '>MM/YY</span>
											</div>
											<Input
												placeholder='CCV'
												onChange={(e) => setCardCVV(e.target.value)}
												className=' lg:w-[216px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px]  p-3 '
												style={{
													backgroundImage: `url(${info.src})`,
													backgroundRepeat: 'no-repeat',
													backgroundSize: '32px 32px',
													backgroundPosition: ' right 12px center',
												}}
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
											<Input
												type='checkbox'
												checked={checkedSave}
												onClick={() => setCheckedSave(!checkedSave)}
												className={`w-4 h-4 appearance-none border-2 border-[#6E7491] p-1 ${
													checkedSave === true ? 'bg-[#605DEC]' : ''
												}`}
											/>{' '}
											<Label className='text-[#6E7491]'>
												Save card and create account for later
											</Label>
										</div>
										<Input
											placeholder='Email address or phone number'
											type='email'
											onChange={(e) => setAccountEmail(e.target.value)}
											className=' lg:w-[480px]  border-[#A1B0CC] placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] mb-6 p-3 '
										/>
										<div className='relative flex items-center justify-between pe-3 lg:w-[480px] border border-[#A1B0CC] rounded mb-[50px]'>
											<Input
												placeholder='Password'
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												type={showPassword ? 'text' : 'password'}
												className='lg:w-[414px] border-0 shadow-none focus-visible:border-0 focus-visible:ring-0 placeholder:text-[#7C8DB0] placeholder:text-[18px] text-[18px] p-3'
											/>
											<div
												onClick={() => setShowPassword(!showPassword)}
												className='cursor-pointer '
											>
												{showPassword ? (
													<FiEyeOff className='w-6 h-6 text-[#6E7491]' />
												) : (
													<FiEye className='w-6 h-6 text-[#6E7491] ' />
												)}
											</div>
											{password && (
												<span
													className={`absolute bottom-[-20px] ms-1 text-xs ${
														strength === 'Strong'
															? 'text-[#007B65]'
															: strength === 'Weak'
															? 'text-[#FF9900]'
															: 'text-[#FF302F]'
													}`}
												>
													{strength === 'Strong'
														? 'Strong password'
														: strength === 'Weak'
														? 'Weak password'
														: 'Password must be at least 8 characters'}
												</span>
											)}{' '}
										</div>

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
										<a className='text-[#605DEC]  ' href=''>
											{' '}
											full cancellation policy{' '}
										</a>
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
											className={`${
												cardName &&
												cardNumber &&
												cardExpiraDate &&
												cardCVV &&
												accountEmail &&
												password
													? 'bg-[#605DEC] text-[#FAFAFA]'
													: 'border border-[#7C8DB0] text-[#7C8DB0] bg-[#cbd4e64c] cursor-not-allowed opacity-100'
											}  py-3  text-[18px] `}
											disabled={
												!(
													cardName &&
													cardNumber &&
													cardExpiraDate &&
													cardCVV &&
													accountEmail &&
													password
												)
											}
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
									className={`${
										cardName &&
										cardNumber &&
										cardExpiraDate &&
										cardCVV &&
										accountEmail &&
										password
											? 'bg-[#605DEC] text-[#FAFAFA]'
											: 'border border-[#7C8DB0] text-[#7C8DB0] bg-[#cbd4e64c] cursor-not-allowed opacity-100'
									}  py-3  text-[18px] block ms-auto `}
									disabled={
										!(
											cardName &&
											cardNumber &&
											cardExpiraDate &&
											cardCVV &&
											accountEmail &&
											password
										)
									}
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
