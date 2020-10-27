import React from 'react';

import {
	Container,
	Row,
	Col,
} from 'reactstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { requireAuth } from '../lib/auth';
import InjectedCheckoutForm from '../components/checkout/CheckoutForm';

const Account = () => {
	const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY;

	// load stripe to inject into elements components
	const stripePromise = loadStripe(STRIPE_API_KEY);

	return (
		<Container>
			<Row>
				<Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
					<h1 style={{ margin: 20 }}>Account Settings</h1>
				</Col>
				<Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
					<Elements stripe={stripePromise}>
						<InjectedCheckoutForm />
					</Elements>
				</Col>
			</Row>
		</Container>
	);
};

export const getServerSideProps = requireAuth();

export default Account;