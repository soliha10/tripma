'use client';
import Footer from '@/components/Main/Footer/Footer';
import LoginHeader from '@/components/Main/Login/LoginHeader';
import OrderForm from './OrderForm';
import Image from 'next/image';
import bags from '@/app/assets/images/bags.svg';
import { useFlight } from '@/context/FlightContext';
import SelectedItem from '@/components/Details/DetailHero/SelectedItem';
import { Button } from '@/components/ui/button';
import { MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function OrderHero() {
  const { selectedDepartFlight, selectedReturnFlight } = useFlight();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [knownTraveller, setKnownTraveller] = useState('');
  const router = useRouter();

  const handleNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/select-seat');
  };

  return (
    <>
      <LoginHeader />
      <section>
        <div className="max-w-[1342px] w-full mx-auto px-5 pb-14  ">
          <div className="pt-[56px]">
            <div className="mb-[36px] lg:w-[682px]">
              <h1 className="text-[#605DEC] text-2xl font-bold mb-4 ">Passenger information</h1>
              <p className="text-[#7C8DB0] text-[18px] ">
                Enter the required information for each traveler and be sure that it exactly matches
                the government-issued ID presented at the airport.
              </p>
            </div>
            <div className="flex justify-between">
              <OrderForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                knownTraveller={knownTraveller}
                setKnownTraveller={setKnownTraveller}
              />

              <div>
                <div className={`w-[400px] mt-[57px]   `}>
                  {selectedDepartFlight && (
                    <div className="border border-[#E9E8FC] rounded-xl px-4 pt-4 flex flex-col gap-3 ">
                      <SelectedItem {...selectedDepartFlight} />
                    </div>
                  )}
                  {selectedReturnFlight && (
                    <div className="border border-[#E9E8FC] rounded-xl px-4 pt-4 flex flex-col gap-3 ">
                      <SelectedItem {...selectedReturnFlight} />
                    </div>
                  )}

                  <div className="p-4 text-right gap-2 flex flex-col text-[#27273F] font-semibold mb-8 ">
                    <div>
                      <span className="inline-block me-10 ">Subtotal</span>
                      <span>$503</span>
                    </div>
                    <div>
                      <span className="inline-block me-10 ">Taxes and Fees</span>
                      <span>$503</span>
                    </div>
                    <div>
                      <span className="inline-block me-10 ">Total</span>
                      <span>$503</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    className={`w-[138px] ms-auto block mb-[104px] ${
                      firstName && lastName && birthDate && email && phoneNumber && knownTraveller
                        ? 'bg-[#605DEC] text-[#FAFAFA]'
                        : 'border-[#7C8DB0] text-[#7C8DB0] border bg-[#cbd4e64c]'
                    }  cursor-pointer py-3   rounded text-[18px]  `}
                    disabled={
                      !(
                        firstName &&
                        lastName &&
                        birthDate &&
                        email &&
                        phoneNumber &&
                        knownTraveller
                      )
                    }
                    onClick={handleNavigate}
                  >
                    Select seats
                  </Button>
                </div>

                <Image src={bags} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
