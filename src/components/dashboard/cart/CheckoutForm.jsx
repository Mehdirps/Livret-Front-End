import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + 'stripe-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la création du paiement.');
            }
            const data = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(data.client_secret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setErrorMessage(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setSuccess(true);
            }
        } catch (error) {
            setErrorMessage('Une erreur s\'est produite.');
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe} className="btn btn-primary mt-3">
                Payer {amount} €
            </button>
            {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
            {success && <div className="text-success mt-3">Paiement réussi !</div>}
        </form>
    );
};

export default CheckoutForm;
