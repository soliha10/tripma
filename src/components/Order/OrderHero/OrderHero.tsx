import Footer from '@/components/Main/Footer/Footer';
import LoginHeader from '@/components/Main/Login/LoginHeader';
import OrderForm from './OrderForm';
import Image from 'next/image';
import bags from '@/app/assets/images/bags.svg';
export default function OrderHero() {
	return (
		<>
			<LoginHeader />
			<section>
				<div className='max-w-[1342px] w-full mx-auto px-5  '>
					<div className='pt-[56px]'>
						<div className='mb-[36px] lg:w-[682px]'>
							<h1 className='text-[#605DEC] text-2xl font-bold mb-4 '>Passenger information</h1>
							<p className='text-[#7C8DB0] text-[18px] '>
								Enter the required information for each traveler and be sure
								that it exactly matches the government-issued ID presented at
								the airport.
							</p>
						</div>
						<div className='flex'>
							<OrderForm  />
							<div>
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
