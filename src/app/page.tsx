// import LoginPage from '@/components/Main/Login/LoginPage';
// import DetailPage from './detail/page';
import MainPage from '@/components/Main/page';
import {ToastContainer} from 'react-toastify'
export default function Home() {
	return (
		<>
		<ToastContainer/>
			<MainPage />
			{/* <LoginPage/> */}
			{/* <DetailPage/> */}
		</>
	);
}
