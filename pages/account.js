import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import AppContext from '../context/AppContext';
import { requireAuth } from '../lib/auth';
import InjectedCheckoutForm from '../components/checkout/CheckoutForm';

const GET_MEMBERSHIP = gql`
	query($id: ID!) {
		membership(id: $id) {
			number
			created_at
		} 
	}
`;

const Account = () => {
	const appContext = useContext(AppContext);

	const { loading, error, data } = useQuery(GET_MEMBERSHIP, {
		variables: { id: appContext.user && appContext.user.membership },
	});

	if (loading) return <h1>Fetching membership</h1>;

	if (data) {
		console.log(data);
		return (
			<div>
				<div className="container__section container__section--blue">
					<h1>Account Settings</h1>
				</div>
				<div className="container__section">
					Membership Number: {data.membership.number}
				</div>
			</div>
		);
	} else if (appContext.user && appContext.user.membership && error) {
		return 'Error fetching membership';
	} else {
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
	}
};

export const getServerSideProps = requireAuth();

export default Account;