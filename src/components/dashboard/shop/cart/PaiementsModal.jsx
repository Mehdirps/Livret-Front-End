/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51PpBnpIXFdsl2Ez7ChX5PyzWowJXyUtPm7xIgF6yesuJS1MwGVgMyzeVHIdW7tkALTce6TwGX1MG48BMqWwtDHHJ00TouExlWZ');

const PaiementsModal = ({ calculateTotal }) => {
    const cart = useSelector(state => state.cart.cart);
    const user = useSelector(state => state.user.user);

    return (
        <div className="modal fade text-dark" id="paiementsModal" tabIndex="-1" aria-labelledby="paiementsModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="paiementsModalLabel">Procéder au paiement</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-4">
                            <h6>Mes informations :</h6>
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <strong>Nom :</strong> {user?.name || 'Non renseigné'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Adresse :</strong> {user?.address || 'Non renseigné'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Téléphone :</strong> {user?.phone || 'Non renseigné'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Email :</strong> {user?.email || 'Non renseigné'}
                                </li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <h6>Récapitulatif du panier :</h6>
                            {cart.length === 0 ? (
                                <p>Votre panier est vide.</p>
                            ) : (
                                <ul className="list-group mb-3">
                                    {cart.map((product, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="my-0">{product.name}</h6>
                                                <small className="text-muted">
                                                    {product.quantity} x {product.price.toFixed(2)}€
                                                </small>
                                            </div>
                                            <span className="text-muted">
                                                {(product.price * product.quantity).toFixed(2)}€
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="d-flex justify-content-between">
                                <h6>Total :</h6>
                                <h6>{calculateTotal()} €</h6>
                                <h6>(+ 4.90€ de frais de port inclu dans le total)</h6>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6>Détails du paiement :</h6>
                            <div className="card p-3">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm amount={calculateTotal()} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#cartModal">
                            Revenir en arrière
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaiementsModal;
