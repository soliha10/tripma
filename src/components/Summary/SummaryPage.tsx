'use client';
import Image from 'next/image';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';
import close from '@/app/[locale]/assets/images/close-summary.svg';
import { useState } from 'react';
import { useFlight } from '@/context/FlightContext';
import SelectedSeatsSummary from './SelectedSeatsSummary';
import visa from '@/app/[locale]/assets/images/visa.svg';
import map from '@/app/[locale]/assets/images/map-summary.svg';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ryokan from '@/app/[locale]/assets/images/ryokan.png';
import bessho from '@/app/[locale]/assets/images/bessho.png';
import hotel from '@/app/[locale]/assets/images/hotel.png';
import hours from '@/app/[locale]/assets/images/hours.png';
import nihon from '@/app/[locale]/assets/images/nihon.png';
import teamlab from '@/app/[locale]/assets/images/teamlab.png';
import SummaryCard from './SummaryCard';
import styles from './css/SummaryPage.module.css';
export default function SummaryPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { selectedDepartFlight, selectedReturnFlight } = useFlight();

  const shopItems = [
    {
      id: 1,
      pic: ryokan,
      name: 'Ryokan Japan',
      price: '$439',
      text: 'Enjoy views of the garden from your room',
    },
    {
      id: 2,
      pic: bessho,
      name: 'Bessho SASA',
      price: '$529',
      text: 'Japanese ryokan with private onsen bath',
    },
    {
      id: 3,
      pic: hotel,
      name: 'HOTEL THE FLAG 大阪市',
      price: '$139',
      text: 'Modern hotel in the heart of Osaka',
    },
    {
      id: 4,
      pic: hours,
      name: '9 Hours Shinjuku',
      price: '$59',
      text: 'A convenient capsule hotel at Shinjuku station',
    },
  ];

  const experienceitems = [
    {
      id: 1,
      pic: nihon,
      name: 'Nihon Kimono',
      price: '$89',
      text: 'Wear the national dress of Japan around the city',
    },
    {
      id: 2,
      pic: teamlab,
      name: 'teamLab Borderless',
      price: '$39',
      text: 'A modern sensory experience of light and sound',
    },
  ];

  return (
    <>
      <LoginHeader />

      <main>
        <section>
          <div className="max-w-[1342px] w-full mx-auto px-5">
            <div className={styles.summaryWrapper}>
              {/* left side */}
              <div className={styles.container}>
                {isOpen && (
                  <div className={styles.successMessage}>
                    <span>
                      Your flight has been booked successfully! Your confirmation number is
                      #381029404387
                    </span>
                    <Image
                      src={close}
                      alt="close"
                      onClick={() => setIsOpen(false)}
                      className={styles.closeIcon}
                      width={24}
                      height={24}
                    />
                  </div>
                )}

                <h1 className={styles.mainTitle}>Bon voyage, Sophia!</h1>
                <span className={styles.confirmationNumber}>
                  Confirmation number: #381029404387
                </span>
                <p className={styles.description}>
                  Thank you for booking your travel with Tripma! Below is a summary of your trip to
                  Narita airport in Tokyo, Japan. We’ve sent a copy of your booking confirmation to
                  your email address. You can also find this page again in{' '}
                  <a href="/my-trips" className={styles.link}>
                    My trips.
                  </a>
                </p>

                <h2 className={styles.sectionTitle}>Flight summary</h2>

                <p className={styles.flightDate}>Departing February 25th, 2021</p>
                {selectedDepartFlight && (
                  <div className={styles.flightCard}>
                    <SelectedSeatsSummary {...selectedDepartFlight} />
                  </div>
                )}
                <span className={styles.seatInfo}>Seat 9F (economy, window), 1 checked bag</span>

                <p className={styles.flightDate}>Arriving March 21st, 2021</p>
                {selectedReturnFlight && (
                  <div className={styles.flightCard}>
                    <SelectedSeatsSummary {...selectedReturnFlight} />
                  </div>
                )}
                <span className={styles.seatInfo}>Seat 4F (business, window), 1 checked bag</span>

                <Table className={styles.priceTable}>
                  <TableCaption className={styles.tableCaption}>Price breakdown</TableCaption>
                  <TableBody className={styles.tableBody}>
                    <TableRow className={styles.tableRow}>
                      <TableCell>Departing Flight</TableCell>
                      <TableCell>$251.50</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>Arriving Flight</TableCell>
                      <TableCell>$251.50</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>Baggage fees</TableCell>
                      <TableCell>$0</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>Seat upgrade (business)</TableCell>
                      <TableCell>$199</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>Subtotal</TableCell>
                      <TableCell>$702</TableCell>
                    </TableRow>
                    <TableRow className={styles.tableRow}>
                      <TableCell>Taxes (9.4%)</TableCell>
                      <TableCell>$66</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter className={styles.tableFooter}>
                    <TableRow className={styles.footerRow}>
                      <TableCell>Amount paid</TableCell>
                      <TableCell>$768</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>

                <h2 className={styles.sectionTitle}>Payment method</h2>
                <div className={styles.paymentCard}>
                  <Image
                    src={visa}
                    alt="Visa"
                    className={styles.visaImage}
                    width={60}
                    height={38}
                  />
                  <strong className={styles.cardName}>Sophia Knowles</strong>
                  <div className={styles.cardDetails}>
                    <span className={styles.cardNumber}>
                      ••••••••••••<span className={styles.cardLastFour}>3456</span>
                    </span>
                    <span>10/23</span>
                  </div>
                </div>

                <h2 className={styles.sectionTitle}>Share your travel itinerary</h2>
                <p className={styles.description}>
                  You can email your itinerary to anyone by entering their email address here.
                </p>
                <form action="" className={styles.form}>
                  <Input
                    placeholder="Email address"
                    className={styles.input}
                    aria-label="Email address"
                  />
                  <Input
                    placeholder="Email address"
                    className={styles.input}
                    aria-label="Email address"
                  />
                  <Input
                    placeholder="Email address"
                    className={styles.input}
                    aria-label="Email address"
                  />
                  <div className={styles.buttonGroup}>
                    <Button className={styles.emailButton} aria-label="Email itinerary">
                      Email itinerary
                    </Button>
                    <Button className={styles.addButton} aria-label="Add another email">
                      Add another
                    </Button>
                  </div>
                </form>

                <h2 className={styles.sectionTitle}>Flight Route</h2>
                <Image
                  src={map}
                  alt="Flight route map"
                  className={styles.mapImage}
                  width={756}
                  height={400}
                />
              </div>

              {/* right side */}
              <div className={styles.containerRight}>
                <h2 className={styles.sectionTitle}>
                  Shop <span className={styles.highlight}>hotels</span>
                </h2>
                <p className={styles.description}>
                  Tripma partners with thousands of hotels to get you the best deal. Save up to 30%
                  when you add a hotel to your trip.
                </p>
                <ul className={styles.cardList}>
                  {shopItems.map(({ id, pic, name, price, text }) => (
                    <SummaryCard key={id} pic={pic} name={name} price={price} text={text} />
                  ))}
                </ul>
                <Button variant="cancel" className={styles.shopButton} aria-label="Shop all hotels">
                  Shop all hotels
                </Button>

                <h2 className={styles.sectionTitle}>
                  Find unique <span className={styles.highlight}>experiences</span>
                </h2>
                <p className={styles.description}>
                  Find events and authentic cultural experiences available exclusively to Tripma
                  users.
                </p>
                <ul className={styles.cardList}>
                  {experienceitems.map(({ id, pic, name, price, text }) => (
                    <SummaryCard key={id} pic={pic} name={name} price={price} text={text} />
                  ))}
                </ul>
                <Button
                  variant="cancel"
                  className={styles.experienceButton}
                  aria-label="View all experiences"
                >
                  View all experiences
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
