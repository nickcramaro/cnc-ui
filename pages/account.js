import React, { useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import {
	Container,
	Row,
	Col,
} from 'reactstrap';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import AppContext from '../context/AppContext';
import InjectedCheckoutForm from '../components/checkout/CheckoutForm';

const Account = () => {
	const router = useRouter();
	const appContext = useContext(AppContext);
	const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_API_KEY;

	// load stripe to inject into elements components
	const stripePromise = loadStripe(STRIPE_API_KEY);

	useEffect(() => {
		console.log(appContext);
		if (!appContext.isAuthenticated) {
			router.push('/'); // redirect away if you are not authenticated
		}
	}, []);

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

export default Account;