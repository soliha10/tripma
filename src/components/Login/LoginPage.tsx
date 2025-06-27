import Image from 'next/image';
import close from '@/app/assets/images/x-close-no.svg';
import logo from '@/app/assets/images/Wordmark.svg';
import go from '@/app/assets/images/departure.svg';
import arrive from '@/app/assets/images/arrival.svg';
import calendar from '@/app/assets/images/calendar-with-dates.svg';
import user from '@/app/assets/images/person-solid.svg';
import bg from '@/app/assets/images/hero-login-bg.jpg';
import LoginCookies from './LoginCookies';

export default function LoginPage() {
	return (
		<>
			<header>
				<div className='bg-[#605DEC] '>
					<div className='max-w-[1342px] w-full mx-auto px-5  '>
						<div className='flex items-center justify-center py-4'>
							<p className='mx-auto text-[#F6F6FE]  text-[18px] font-semibold  '>
								Join Tripma today and save up to 20% on your flight using code
								TRAVEL at checkout. Promotion valid for new users only.
							</p>
							<Image src={close} alt='icon' width={32} height={32} />
						</div>
					</div>
				</div>

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

			<main
				style={{
					backgroundImage: `url(${bg.src})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					backgroundPosition: 'top center',
				}}
				className='h-screen relative'
			>
				<section >
					<div className='max-w-[1342px] w-full mx-auto px-5  '>
						<div className=' pt-[135px] w-[756px] mx-auto'>
							<h1 className='text-[95px] text-center font-extrabold leading-24 bg-gradient-to-r from-[#62ACFD] via-[#893FFD]  to-[#5CA1FD]  text-transparent bg-clip-text  mb-[68px]'>
								It’s more than just a trip
							</h1>
						</div>
						<form
							action=''
							className='flex items-center justify-center  rounded w-fit border border-[#CBD4E6]  mx-auto '
							style={{
								boxShadow:
									'0px 2px 4px 0px rgba(7, 4, 146, 0.10), 0px 24px 60px 0px rgba(6, 47, 125, 0.05), 0px 12px 24px 0px rgba(27, 59, 119, 0.05)',
							}}
						>
							<input
								className=' w-[324.5px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px] border-e border-[#CBD4E6]  outline-0 '
								name=''
								id=''
								type='text'
								placeholder='From where?'
								style={{
									backgroundImage: `url(${go.src})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '32px, 32px',
									backgroundPosition: '8px center',
								}}
							/>
							<input
								className=' w-[324.5px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px]  border-e  border-[#CBD4E6] outline-0 '
								name=''
								id=''
								type='text'
								placeholder='Where to?'
								style={{
									backgroundImage: `url(${arrive.src})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '32px, 32px',
									backgroundPosition: '8px center',
								}}
							/>
							<input
								className=' w-[252px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px] border-e  border-[#CBD4E6] outline-0 '
								name=''
								id=''
								type='text'
								placeholder='Depart - Return'
								style={{
									backgroundImage: `url(${calendar.src})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '32px, 32px',
									backgroundPosition: '8px center',
								}}
							/>
							<input
								className=' w-[200px] ps-[52px] py-[10px] pe-2 text-[#7C8DB0] placeholder:text-[#7C8DB0] text-[18px] placeholder:text-[18px]      outline-0 '
								name=''
								id=''
								type='text'
								placeholder='1 adult'
								style={{
									backgroundImage: `url(${user.src})`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '32px, 32px',
									backgroundPosition: '8px center',
								}}
							/>
							<button className='w-[96px] text-center text-[#FAFAFA] p-3 bg-[#605DEC] rounded cursor-pointer '>
								Search
							</button>
						</form>
            <LoginCookies  />
					</div>
				</section>
			</main>
		</>
	);
}
