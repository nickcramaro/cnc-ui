import React, { useState, useContext } from 'react';

import { FormGroup, Label, Input } from 'reactstrap';

import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import AppContext from '../../context/AppContext';

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
	const appContext = useContext(AppContext);

	function onChange(e) {
		// set the key = to the name property equal to the value typed
		const updateItem = (data[e.target.name] = e.target.value);
		// update the state data object
		setData({ ...data, updateItem });
	}

	async function submitOrder() {
		// // Use elements.getElement to get a reference to the mounted Element.
		const cardElement = elements.getElement(CardElement);

		// // Pass the Element directly to other Stripe.js methods:
		// // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
		// get token back from stripe to process credit card
		const token = await stripe.createToken(cardElement);
		const userToken = Cookies.get('token');
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
			method: 'POST',
			headers: userToken && { Authorization: `Bearer ${userToken}` },
			body: JSON.stringify({
				amount: Number(Math.round(appContext.cart.total + 'e2') + 'e-2'),
				dishes: appContext.cart.items,
				address: data.address,
				city: data.city,
				state: data.state,
				token: token.token.id,
			}),
		});

		if (!response.ok) {
			setError(response.statusText);
		}
	}

	return (
		<div className="paper">
			<h5>Your information:</h5>
			<hr />
			<FormGroup>
				<div>
					<Label>Address</Label>
					<Input name="address" onChange={onChange} />
				</div>
			</FormGroup>
			<FormGroup>
				<div>
					<Label>City</Label>
					<Input name="city" onChange={onChange} />
				</div>
				<div>
					<Label>State</Label>
					<Input name="state" onChange={onChange} />
				</div>
			</FormGroup>

			<CardSection data={data} stripeError={error} submitOrder={submitOrder} />
		</div>
	);
};
export default CheckoutForm;