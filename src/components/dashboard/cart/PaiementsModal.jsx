import React from 'react';
import { useSelector } from 'react-redux';

const PaiementsModal = () => {
    const cart = useSelector(state => state.cart.cart);
    const user = useSelector(state => state.user.user);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

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
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6>Détails du paiement :</h6>
                            <div className="card p-3">
                                <p>Intégration Stripe</p>
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
                        <button type="button" className="btn btn-primary">
                            Payer {calculateTotal()} €
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaiementsModal;
