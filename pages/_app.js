import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cookie from 'js-cookie';

import Layout from '../components/Layout';
import AppContext from '../context/AppContext';
import withApollo from '../lib/apollo';
import { to } from '../lib/utils';

import '../styles/global.scss';

const App = ({ Component, pageProps }) => {
	const [user, setUser] = useState(null);
	const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

	useEffect(() => {
		async function validateUser() {
			const token = Cookie.get('token');

			if (token) {
				// authenticate the token on the server and place set user object
				const { data: res } = await to(fetch(`${API_URL}/users/me`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}));

				if (res) {
					// if res comes back not valid, token is not valid
					// delete the token and log the user out on client
					if (!res.ok) {
						Cookie.remove('token');
						setUser(null);
						return null;
					}
					const user = await res.json();
					setUser(user);
				}
			}
		}

		validateUser();
	}, [setUser]);

	return (
		<AppContext.Provider
			value={{
				user: user,
				isAuthenticated: !!user,
				setUser: setUser,
			}}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</AppContext.Provider>
	);
};

App.propTypes = {
	Component: PropTypes.func.isRequired,
	pageProps: PropTypes.object.isRequired
};

export default withApollo({ ssr: true })(App);