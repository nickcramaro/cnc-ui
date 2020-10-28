import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AppContext from '../context/AppContext';
import { logout } from '../lib/auth';
import PropTypes from 'prop-types';

const Layout = (props) => {
	const title = 'Carbon Neutral Club';
	const { user, setUser } = useContext(AppContext);

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta charSet="utf-8" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<div className="cnc-container">
				<header>
					<nav className="cnc-nav">
						<div>
							<Link href="/">
								<a>
									<img src="/logo.svg" />
								</a>
							</Link>
						</div>

						<div>
							{user ? (
								<h5>{user.username}</h5>
							) : (
								<Link href="/register">
									<a>Sign up</a>
								</Link>
							)}
						</div>
						{user && (
							<div>
								<Link href="/account">
									<a>Account</a>
								</Link>
							</div>
						)}
						<div>
							{user ? (
								<Link href="/">
									<a
										onClick={() => {
											logout();
											setUser(null);
										}}
									>
										Logout
									</a>
								</Link>
							) : (
								<Link href="/login">
									<a>Sign in</a>
								</Link>
							)}
						</div>
					</nav>
				</header>
				{props.children}
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;