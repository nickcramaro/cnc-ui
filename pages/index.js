import React from 'react';
import { gql, useQuery } from '@apollo/client';

const HOMEPAGE_CONTENT = gql`
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
	const { loading, error, data } = useQuery(HOMEPAGE_CONTENT);
	if (error) return 'Error fetching content';
	if (loading) return <h1>Fetching</h1>;
	if (data.homeContent) {
		return (
			<div className="container__section container__section--blue">
				<h1>{data.homeContent.copy[0].en}</h1>
			</div>
		);
	}
};

export default Home;