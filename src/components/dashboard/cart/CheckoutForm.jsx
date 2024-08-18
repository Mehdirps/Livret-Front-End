import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { setError, setSuccess } from '../../../redux/actions';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch();

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
                dispatch(setError({ error: error.message }));
            } else if (paymentIntent.status === 'succeeded') {
                dispatch(setSuccess({ success: 'Paiement réussi avec succès !' }));
            }
        } catch (error) {
            dispatch(setError({ error: error.message }));
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe} className="btn btn-primary mt-3">
                Payer {amount} €
            </button>
        </form>
    );
};

export default CheckoutForm;
