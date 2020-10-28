import React, { useState, useContext, useEffect } from 'react';

import { useRouter } from 'next/router';
import { registerUser } from '../lib/auth';
import AppContext from '../context/AppContext';

const Register = () => {
	const [data, setData] = useState({ email: '', username: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});
	const router = useRouter();
	const appContext = useContext(AppContext);

	useEffect(() => {
		if (appContext.isAuthenticated) {
			router.push('/'); // redirect if you're already logged in
		}
	}, []);

	return (
		<div>
			<div className="container__section container__section--blue">
				<h2>CNC Registration</h2>
			</div>
			<section className="container__section">
				{Object.entries(error).length !== 0 &&
					error.constructor === Object &&
					error.message.map((error) => {
						return (
							<div
								key={error.messages[0].id}
								style={{ marginBottom: 10 }}
							>
								<small style={{ color: 'red' }}>
									{error.messages[0].message}
								</small>
							</div>
						);
					})}
				<form>
					<fieldset disabled={loading}>
						<div>
							<label htmlFor="username">Username:</label>
							<input
								disabled={loading}
								onChange={(e) =>
									setData({ ...data, username: e.target.value })
								}
								value={data.username}
								type="text"
								name="username"
							/>
						</div>
						<div>
							<label htmlFor="email">Email:</label>
							<input
								onChange={(e) =>
									setData({ ...data, email: e.target.value })
								}
								value={data.email}
								type="email"
								name="email"
							/>
						</div>
						<div style={{ marginBottom: 30 }}>
							<label htmlFor="password">Password:</label>
							<input
								onChange={(e) =>
									setData({ ...data, password: e.target.value })
								}
								value={data.password}
								type="password"
								name="password"
							/>
						</div>
						<div>
							<span>
								<a href="">
									<small>Forgot Password?</small>
								</a>
							</span>
							<button
								disabled={loading}
								onClick={() => {
									setLoading(true);
									registerUser(data.username, data.email, data.password)
										.then((res) => {
											// set authed user in global context object
											appContext.setUser(res.data.user);
											setLoading(false);
										})
										.catch((error) => {
											setError(error.response.data);
											setLoading(false);
										});
								}}
							>
								{loading ? 'Loading..' : 'Submit'}
							</button>
						</div>
					</fieldset>
				</form>
			</section>
		</div>
	);
};

export default Register;