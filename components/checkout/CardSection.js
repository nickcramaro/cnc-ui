import React from 'react';
import PropTypes from 'prop-types';

import { CardElement } from '@stripe/react-stripe-js';

const CardSection = (props) => {
	return (
		<div>
			<div>
				<label htmlFor="card-element">Credit or debit card</label>

				<div>
					<fieldset style={{ border: 'none' }}>
						<div className="form-row">
							<div id="card-element" style={{ width: '100%' }}>
								<CardElement
									options={{
										style: { width: '100%', base: { fontSize: '18px' } },
									}}
								/>
							</div>
							<br />
							<div>
								<button onClick={props.submitOrder}>Confirm order</button>
							</div>
							{props.stripeError ? (
								<div>{props.stripeError.toString()}</div>
							) : null}
							<div id="card-errors" role="alert" />
						</div>
					</fieldset>
				</div>
			</div>
		</div>
	);
};

CardSection.propTypes = {
	submitOrder: PropTypes.func.isRequired,
	stripeError: PropTypes.string.isRequired
};

export default CardSection;