import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Col, Row } from 'reactstrap';

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
			<div className="container-fluid">
				<Row>
					<Col>
						{data.homeContent.copy[0].en}
					</Col>
				</Row>
			</div>
		);
	}
};

export default Home;