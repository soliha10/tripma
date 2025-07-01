import Image from 'next/image';
import logo from '@/app/assets/images/Wordmark.svg';
import appStore from '@/app/assets/images/app store.svg';
import google from '@/app/assets/images/google play.svg';
import { FaFacebookSquare, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
	const about = [
		'About Tripma',
		'How it works',
		'Careers',
		'Press',
		'Blog',
		'Forum',
	];
	const partner = [
		'Partnership programs',
		'Affiliate program',
		'Connectivity partners',
		'Promotions and events',
		'Integrations',
		'Community',
		'Loyalty program',
	];
	const support = [
		'Help Center',
		'Contact us',
		'Privacy policy',
		'Terms of service',
		'Trust and safety',
		'Accessibility',
	];
	const app = ['Tripma for Android', 'Tripma for iOS', 'Mobile site'];
	return (
		<footer>
			<div className='border-b  border-[#3CBD4E6] '>
				<div className='max-w-[1342px] w-full mx-auto px-5  '>
					<div className='flex justify-between ps-[50px] pe-[120px] pt-[76px] pb-[60px]'>
						<a href=''>
							<Image src={logo} alt='pic' />
						</a>
						<ul className='flex flex-col gap-4 pt-5 '>
							<li>
								<strong className='text-[#6E7491] lg:text-[18px] font-bold '>
									About
								</strong>
							</li>
							{about.map((item, index) => (
								<li key={index}>
									<a href='' className='text-[#7C8DB0] lg:text-base '>
										{item}
									</a>
								</li>
							))}
						</ul>
						<ul className='flex flex-col gap-4 pt-5'>
							<li>
								<strong className='text-[#6E7491] lg:text-[18px] font-bold '>
									Partner with us
								</strong>
							</li>
							{partner.map((item, index) => (
								<li key={index}>
									<a href='' className='text-[#7C8DB0] lg:text-base '>
										{item}
									</a>
								</li>
							))}
						</ul>
						<ul className='flex flex-col gap-4 pt-5'>
							<li>
								<strong className='text-[#6E7491] lg:text-[18px] font-bold '>
									Support
								</strong>
							</li>
							{support.map((item, index) => (
								<li key={index}>
									<a href='' className='text-[#7C8DB0] lg:text-base '>
										{item}
									</a>
								</li>
							))}
						</ul>
						<ul className='flex flex-col  pt-5'>
							<li>
								<strong className='text-[#6E7491] lg:text-[18px] font-bold mb-4 inline-block'>
									Get the app
								</strong>
							</li>
							{app.map((item, index) => (
								<li key={index} className='mb-4'>
									<a href='' className='text-[#7C8DB0] lg:text-base '>
										{item}
									</a>
								</li>
							))}
							<li className='mt-4 mb-3'>
								<a href=''>
									<Image src={appStore} alt='' />
								</a>
							</li>
							<li>
								<a href=''>
									<Image src={google} alt='' />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='max-w-[1342px] w-full mx-auto px-5  '>
				<div className='py-[36px] flex items-center justify-between'>
					<ul className='flex items-center gap-5'>
						<li>
							<a href=''>
								<FaTwitter className='text-[#6E7491] w-6 h-6' />
							</a>
						</li>
						<li>
							<a href=''>
								<FaInstagram className='text-[#6E7491] w-6 h-6' />
							</a>
						</li>
						<li>
							<a href=''>
								<FaFacebookSquare className='text-[#6E7491] w-6 h-6' />
							</a>
						</li>
					</ul>
          <span className='text-[#7C8DB0] text-[18px] '>© 2020 Tripma incorporated</span>
				</div>
			</div>
		</footer>
	);
}
