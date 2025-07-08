import { Button } from '@/components/ui/button';
import Image from 'next/image';
import menu from '@/app/assets/images/menu.svg';
import logo from '@/app/assets/images/Wordmark.svg';
import plane from '@/app/assets/images/Plane (seat selection).svg';
import arrow from '@/app/assets/images/arrow-white.svg';
import economy from "@/app/assets/images/Economy Seats.svg"
import busines from "@/app/assets/images/Business Seats.svg"


export default function SelectSeats() {
	return (
		<section>
			<div className='max-w-[1440px]  w-full mx-auto px-6 '>
				<div className='flex'>
					<div className='lg:w-[728px] border-e border-[#CBD4E6]'>
						<div className='flex items-center py-[21px] gap-3  '>
							<Button className='w-8 h-8'>
								<Image src={menu} alt='btn' />
							</Button>

							<a href=''>
								<Image src={logo} alt='pic' />
							</a>
						</div>
						<Image src={plane} alt='plane' />
					</div>

					<div className='w-[712px]'>
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

							<div className='py-5 px-6 flex flex-col w-[210px]'>
								<time>Feb 25 | 7:00AM</time>
								<span className='text-xs'>Departing</span>
							</div>

							<div className='py-5 px-6 flex flex-col w-[210px]'>
								<time>Mar 21 | 12:15PM</time>
								<span className='text-xs'>Arriving</span>
							</div>
						</div>

						<div className='flex p-2 gap-1'>
							{/* economy */}
							<div>
                <Image src={economy} alt='economy'/>
              </div>
							{/* bussiness */}
							<div>
                <Image src={busines} alt='economy'/>
              </div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
