import React, { useState } from 'react';

import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import CardSection from './CardSection';

const CheckoutForm = () => {
	const [data, setData] = useState({
		address: '',
		city: '',
		state: '',
		stripe_id: '',
	});
	const [error, setError] = useState('');
	const stripe = useStripe();
	const elements = useElements();

	function onChange(e) {
		// set the key = to the name property equal to the value typed
		const updateItem = (data[e.target.name] = e.target.value);
		// update the state data object
		setData({ ...data, updateItem });
	}

	async function submitOrder() {
		// // Use elements.getElement to get a reference to the mounted Element.
		const cardElement = elements.getElement(CardElement);

		// get token back from stripe to process credit card
		const token = await stripe.createToken(cardElement);

		if (token.error) {
			setError(token.error.message);
			return;
		}

		const userToken = Cookies.get('token');
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/memberships`, {
			method: 'POST',
			headers: userToken && { Authorization: `Bearer ${userToken}` },
			body: JSON.stringify({
				token: token.token.id,
			}),
		});

		if (!response.ok) {
			setError(response.statusText);
			return;
		}
	}

	return (
		<div>
			<h4>Your information</h4>
			<div>
				<div>
					<label htmlFor="address">Address</label>
					<input name="address" onChange={onChange} />
				</div>
			</div>
			<div>
				<div>
					<label htmlFor="city">City</label>
					<input name="city" onChange={onChange} />
				</div>
				<div>
					<label htmlFor="state">State</label>
					<input name="state" onChange={onChange} />
				</div>
			</div>

			<CardSection data={data} stripeError={error} submitOrder={submitOrder} />
		</div>
	);
};
export default CheckoutForm;