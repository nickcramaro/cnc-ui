import React from 'react';
import { gql, useQuery } from '@apollo/client';

const QUERY = gql`
  {
    homeContent {
      copy {
        key
        en
        fr
      }
    }
  }
`;

const Home = () => {
	const { loading, error, data } = useQuery(QUERY);
	if (error) return 'Error fetching content';
	if (loading) return <h1>Fetching</h1>;
	if (data.homeContent) {
		return (
			<div>
				{data.homeContent.copy[0].en}
			</div>
		);
	}
};

export default Home;