import React from 'react';
import Cookie from 'js-cookie';
import fetch from 'isomorphic-fetch';
import App from 'next/app';

import Layout from '../components/layout';
import AppContext from '../context/app-context';
import withApollo from '../lib/apollo';

import '../styles/global.scss';
import 'bootstrap/dist/css/bootstrap.css';

class CNCApp extends App {
	state = {
		user: null,
	};

	componentDidMount() {
		const token = Cookie.get('token');

		if (token) {
			// authenticate the token on the server and place set user object
			fetch('http://localhost:1337/users/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then(async (res) => {
				// if res comes back not valid, token is not valid
				// delete the token and log the user out on client
				if (!res.ok) {
					Cookie.remove('token');
					this.setState({ user: null });
					return null;
				}
				const user = await res.json();
				this.setUser(user);
			});
		}
	}

	setUser = (user) => {
		this.setState({ user });
	};

	render() {
		const { Component, pageProps } = this.props;

		return (
			<AppContext.Provider
				value={{
					user: this.state.user,
					isAuthenticated: !!this.state.user,
					setUser: this.setUser,
				}}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppContext.Provider>
		);
	}
}

export default withApollo({ ssr: true })(CNCApp);