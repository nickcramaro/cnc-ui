import React, { useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AppContext from '../context/AppContext';
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";

const Account = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);

  // load stripe to inject into elements components
  const stripePromise = loadStripe("pk_test_51HdmOhAv04GTIr8UCS9YnaJnxuUMlXMq30JXCbIU0MjvjNmSjXpcbGLi4M7PmYgop7Bo1aPTn3lXvE4YPe8mzBqI00RS5TSOTE");

  useEffect(() => {
    console.log(appContext)
    if (!appContext.isAuthenticated) {
      router.push("/"); // redirect away if you are not authenticated
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col style={{ paddingRight: 0 }} sm={{ size: 3, order: 1, offset: 2 }}>
          <h1 style={{ margin: 20 }}>Account Settings</h1>
        </Col>
        <Col style={{ paddingLeft: 5 }} sm={{ size: 6, order: 2 }}>
          <Elements stripe={stripePromise}>
            <InjectedCheckoutForm />
          </Elements>
        </Col>
      </Row>
    </Container>
  );
};

export default Account;