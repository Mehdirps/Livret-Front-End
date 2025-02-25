import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to use toBeInTheDocument
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import configureStore from 'redux-mock-store';
import CheckoutForm from '../src/components/dashboard/shop/cart/CheckoutForm';

const stripePromise = loadStripe('pk_test_51PpBnpIXFdsl2Ez7ChX5PyzWowJXyUtPm7xIgF6yesuJS1MwGVgMyzeVHIdW7tkALTce6TwGX1MG48BMqWwtDHHJ00TouExlWZ');
const mockStore = configureStore([]);
const store = mockStore({
  user: { user: { name: 'John Doe', email: 'john.doe@example.com', address: '123 Main St', phone: '1234567890', id: 1 } },
  cart: { cart: [] },
});

describe('CheckoutForm', () => {
  test('renders CheckoutForm component', () => {
    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={1000} />
        </Elements>
      </Provider>
    );

    expect(screen.getByText(/Payer 1000 €/i)).toBeInTheDocument();
  });

  test('submits the form', async () => {
    render(
      <Provider store={store}>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={1000} />
        </Elements>
      </Provider>
    );

    const button = screen.getByText(/Payer 1000 €/i);
    fireEvent.click(button);

    // Add your assertions here to check if the form submission works as expected
  });
});


