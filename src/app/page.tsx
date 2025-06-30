import LoginHeader from '@/components/Login/LoginHeader';
import LoginPage from '@/components/Login/LoginPage';
import Adventure from '@/components/Main/Adventure';

export default function Home() {
	return (
		<>
			<LoginHeader />
			<LoginPage/>
			<Adventure/>
		</>
	);
}
