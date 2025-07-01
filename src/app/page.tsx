import Footer from '@/components/Footer/Footer';
import LoginHeader from '@/components/Login/LoginHeader';
import LoginPage from '@/components/Login/LoginPage';
import Adventure from '@/components/Main/Adventure/Adventure';
import Explore from '@/components/Main/Explore/Explore';
import Testimonial from '@/components/Main/Testimonial/Testimonial';

export default function Home() {
	return (
		<>
			<LoginHeader />
			<LoginPage />
			<Adventure />
			<Explore/>
			<Testimonial/>
			<Footer/>
		</>
	);
}
