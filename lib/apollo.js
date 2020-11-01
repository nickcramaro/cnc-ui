import { withApollo } from 'next-apollo';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookie from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const httpLink = createHttpLink({
	uri: `${API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = Cookie.get('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
		}
	};
});

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

export default withApollo(apolloClient);