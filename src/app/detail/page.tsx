import DetailHero from "@/components/Details/DetailHero/DetailHero";
import JapanPlaces from "@/components/Details/JapanPlaces/JapanPlaces";
import SanFransiscoPlaces from "@/components/Details/SanFransiscoPlaces/SanFransiscoPlaces";
import Footer from "@/components/Main/Footer/Footer";
import LoginHeader from "@/components/Main/Login/LoginHeader";

export default function DetailPage() {
  return (
    <>
      <LoginHeader />
      <DetailHero />
      <JapanPlaces />
      <SanFransiscoPlaces />
      <Footer/>
    </>
  );
}
