/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { setError, setSuccess } from '../../../../stores/slices/livretSlice';
import { clearCart } from '../../../../stores/slices/cartSlice';

const CheckoutForm = ({ amount }) => {

    const user = useSelector(state => state.user.user);
    const cart = useSelector(state => state.cart.cart);

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
                dispatch(clearCart());
                document.getElementById('paiementsModal').classList.remove('show');

                const orderDetails = {
                    orderId: paymentIntent.id,
                    user: {
                        name: user.name,
                        email: user.email,
                        address: user.address,
                        phone: user.phone,
                        id: user.id,
                    },
                    cart: cart,
                    totalAmount: amount,
                };

                const response = await fetch(process.env.REACT_APP_API_URL + 'send-confirmation-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                });

                if (response.error) {
                    console.log('Erreur lors de l\'envoi de l\'email de confirmation.');
                    
                }else{
                    console.log('Email de confirmation envoyé avec succès !');
                }
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
