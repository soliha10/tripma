'use client'
import Image from 'next/image';
import { useState } from 'react';
import close from '@/app/assets/images/x-close-no.svg';
import logo from '@/app/assets/images/Wordmark.svg';
export default function LoginHeader() {
	const [isVisible, setIsVisible] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header>
			{isVisible && (
				<div className='bg-[#605DEC] '>
					<div className='max-w-[1342px] w-full mx-auto px-5  '>
						<div className='flex items-center justify-center py-4'>
							<p className='mx-auto text-[#F6F6FE]  text-[18px] font-semibold  '>
								Join Tripma today and save up to 20% on your flight using code
								TRAVEL at checkout. Promotion valid for new users only.
							</p>
							<Image
								src={close}
								alt='icon'
								width={32}
								height={32}
								className='cursor-pointer'
								onClick={() => setIsVisible(false)}
							/>
						</div>
					</div>
				</div>
			)}

			<div className='max-w-[1342px] w-full mx-auto px-5  '>
				<div className='py-[21px] flex justify-between items-center '>
					<a href=''>
						<Image src={logo} alt='' width={131} height={54} />
					</a>
					<nav>
						<ul className='flex items-center'>
							<li>
								<a
									href=''
									className='text-[#7C8DB0]  lg:text-base hover:text-[#605DEC] lg:me-[36px] '
								>
									Flights
								</a>
							</li>
							<li>
								<a
									href=''
									className='text-[#7C8DB0]  lg:text-base hover:text-[#605DEC] lg:me-[36px] '
								>
									Hotels
								</a>
							</li>
							<li>
								<a
									href=''
									className='text-[#7C8DB0]  lg:text-base hover:text-[#605DEC] lg:me-[36px] '
								>
									Packages
								</a>
							</li>
							<li>
								<button
									className='text-[#7C8DB0]  lg:text-base hover:text-[#605DEC] lg:me-[26px] cursor-pointer '
									type='submit'
								>
									Sign in
								</button>
							</li>
							<li>
								<button
									onClick={() => setIsOpen(true)}
									className='  lg:text-base  cursor-pointer bg-[#605DEC] rounded text-center lg:w-[95px] py-3 text-[#FAFAFA] '
									type='submit'
								>
									Sign up
								</button>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
}
