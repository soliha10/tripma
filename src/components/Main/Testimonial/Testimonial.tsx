import user1 from '@/app/assets/images/avatar.png';
import user2 from '@/app/assets/images/avatar (1).png';
import user3 from '@/app/assets/images/avatar (2).png';
import fullRating from '@/app/assets/images/star-full.svg';
import rating from '@/app/assets/images/star row.svg';
import TestimonialCard from './TestimonialCard';
export default function Testimonial() {
	const feedbacks = [
		{
			id: 1,
			userPic: user1,
			userName: 'Yifei Chen',
			userLocation: 'Seoul, South Korea | ',
			time: 'April 2019',
			rating: fullRating,
			feedback:
				'What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me ',
		},
		{
			id: 2,
			userPic: user2,
			userName: 'Kaori Yamaguchi',
			userLocation: 'Honolulu, Hawaii | ',
			time: 'February 2017',
			rating: rating,
			feedback:
				'My family and I visit Hawaii every year, and we usually book our flights using other services. Tripma was recommened to us by a long time friend, and I’m so glad we tried it out! The process was easy and ',
		},
		{
			id: 3,
			userPic: user3,
			userName: 'Anthony Lewis',
			userLocation: 'Berlin, Germany | ',
			time: 'April 2019',
			rating: fullRating,
			feedback:
				'When I was looking to book my flight to Berlin from LAX, Tripma had the best browsing experiece so I figured I’d give it a try. It was my first time using Tripma, but I’d definitely recommend it to a friend and use it for ',
		},
	];
	return (
		<section>
			<div className='max-w-[1342px] w-full mx-auto px-5  '>
				<div className='pt-[64px] pb-[104px] '>
					<h2 className='text-center  text-[#6E7491] text-2xl font-bold mb-6 '>What <span className='text-[#605DEC]'>Tripma</span> users are saying</h2>

					<ul className='flex items-center justify-between'>
						{feedbacks.map(
							({
								id,
								userPic,
								userName,
								userLocation,
								time,
								rating,
								feedback,
							}) => (
								<TestimonialCard
									key={id}
									userPic={userPic}
									userName={userName}
									userLocation={userLocation}
									time={time}
									rating={rating}
									feedback={feedback}
								/>
							),
						)}
					</ul>
				</div>
			</div>
		</section>
	);
}
