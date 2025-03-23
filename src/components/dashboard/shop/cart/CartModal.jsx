import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RemoveProduct from './RemoveProduct';
import ChangeProductQuantity from './ChangeProductQuantity';


const CartModal = ({ calculateTotal }) => {
    const cart = useSelector(state => state.cart.cart);



    return (
        <div className="modal fade text-dark" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="cartModalLabel">Mon Panier</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {cart.length === 0 ? (
                            <p>Votre panier est vide.</p>
                        ) : (
                            <>
                                <ul className="list-group mb-3">
                                    {cart.map((product, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className='d-flex'>
                                                <div style={{ width: '50px' }}>
                                                    <img style={{ width: '100%' }} src={process.env.REACT_APP_URL + product.image} alt={product.name} />
                                                </div>
                                                <div>
                                                    <h6 className="my-0">{product.name}</h6>
                                                    <small className="text-muted">
                                                        {product.quantity} x {product.price.toFixed(2)}€
                                                    </small>
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center gap-2'>
                                                <span className="text-muted">
                                                    {(product.price * product.quantity).toFixed(2)}€
                                                </span>
                                                <ChangeProductQuantity product={product} />
                                                <RemoveProduct productId={product.id} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="d-flex justify-content-between">
                                    <h6>Total :</h6>
                                    <h6>{calculateTotal()} €</h6>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Fermer
                        </button>
                        {
                            cart.length > 0 && (
                                <>
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paiementsModal">
                                        Passer à la caisse
                                    </button>
                                    <p className="cgu">En cliquant sur "Passer à la caisse", vous acceptez les <a href="/cgu" target="_blank">CGU/CGV</a> et la <a href="/mentions-legales" target="_blank">Politique de confidentialité</a>.</p>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartModal;