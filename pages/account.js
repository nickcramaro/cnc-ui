import React from 'react';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { requireAuth } from '../lib/auth';
import InjectedCheckoutForm from '../components/checkout/CheckoutForm';

const Account = () => {
	const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY;

	// load stripe to inject into elements components
	const stripePromise = loadStripe(STRIPE_API_KEY);

	return (
		<div>
			<div className="container__section container__section--blue">
				<h1>Account Settings</h1>
			</div>
			<div className="container__section">
				<Elements stripe={stripePromise}>
					<InjectedCheckoutForm />
				</Elements>
			</div>
		</div>
	);
};

export const getServerSideProps = requireAuth();

export default Account;