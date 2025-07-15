'use client';
import Adventure from './Adventure/Adventure';
import Explore from './Explore/Explore';
import Footer from './Footer/Footer';
import LoginHeader from './Login/LoginHeader';
import LoginPage from './Login/LoginPage';
import Testimonial from './Testimonial/Testimonial';

export default function MainPage() {
  return (
    <>
      <LoginHeader />
      <LoginPage />
      <Adventure />
      <Explore />
      <Testimonial />
      <Footer />
    </>
  );
}
