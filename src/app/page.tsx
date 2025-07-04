import DetailHero from '@/components/Details/DetailHero/DetailHero';
import JapanPlaces from '@/components/Details/JapanPlaces/JapanPlaces';
import SanFransiscoPlaces from '@/components/Details/SanFransiscoPlaces/SanFransiscoPlaces';
import Footer from '@/components/Main/Footer/Footer';
import LoginHeader from '@/components/Main/Login/LoginHeader';
// import LoginPage from '@/components/Main/Login/LoginPage';
// import Adventure from '@/components/Main/Adventure/Adventure';
// import Explore from '@/components/Main/Explore/Explore';
// import Testimonial from '@/components/Main/Testimonial/Testimonial';

export default function Home() {
	return (
		<>
			<LoginHeader />
			<DetailHero />
			<JapanPlaces/>
			<SanFransiscoPlaces/>
			{/* <LoginPage />
			<Adventure />
			<Explore/>
			<Testimonial/> */}
			<Footer />
		</>
	);
}
