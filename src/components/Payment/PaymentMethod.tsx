'use client';
import Footer from '../Main/Footer/Footer';
import LoginHeader from '../Main/Login/LoginHeader';

export default function PaymentMethod() {
	return (
		<>
			<LoginHeader />

			<main>
				<section>
					<div className='max-w-[1342px]  w-full mx-auto px-5 '>
						<div>
							<h2>Payment method</h2>
							<p>
								Select a payment method below. Tripma processes your payment
								securely with end-to-end encryption.
							</p>
						</div>
					</div>
				</section>
			</main>

			<Footer />
			<section className='bg-black'>here</section>
		</>
	);
}
