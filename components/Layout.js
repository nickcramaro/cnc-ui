import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Container, Nav, NavItem } from 'reactstrap';
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
			<Container className="cnc-container">
				<header>
					<Nav className="cnc-nav navbar">
						<NavItem>
							<Link href="/">
								<a className="navbar-brand">
									<img src="/logo.svg" />
								</a>
							</Link>
						</NavItem>

						<NavItem className="ml-auto">
							{user ? (
								<h5>{user.username}</h5>
							) : (
								<Link href="/register">
									<a className="nav-link">Sign up</a>
								</Link>
							)}
						</NavItem>
						{user && (
							<NavItem>
								<Link href="/account">
									<a className="nav-link">Account</a>
								</Link>
							</NavItem>
						)}
						<NavItem>
							{user ? (
								<Link href="/">
									<a
										className="nav-link"
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
									<a className="nav-link">Sign in</a>
								</Link>
							)}
						</NavItem>
					</Nav>
				</header>
				{props.children}
			</Container>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;