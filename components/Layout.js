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
				<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
			</Head>
			<div className="container">
				<header>
					<nav className="nav">
						<div className="nav__logo">
							<Link href="/">
								<a className="nav__logo--link">
									<img src="/logo.svg" />
								</a>
							</Link>
						</div>

						<div className="nav__menu">
							{!user && (
								<Link href="/register">
									<a className="nav__menu-item">Sign up</a>
								</Link>
							)}
							{user && (
								<Link href="/account">
									<a className="nav__menu-item">{user.username}</a>
								</Link>
							)}
							{user ? (
								<Link href="/">
									<a
										className="nav__menu-item"
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
									<a className="nav__menu-item">Sign in</a>
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