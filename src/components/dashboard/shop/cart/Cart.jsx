/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartModal from './CartModal';
import PaiementsModal from './PaiementsModal';

const Cart = () => {
    const cart = useSelector(state => state.cart.cart);

    const [cartLength, setCartLength] = useState(cart.length);

    useEffect(() => {
        let length = 0;
        cart.forEach(item => {
            length += item.quantity;
        });

        setCartLength(length);
    }
    , [cart]);
    
    const calculateTotal = () => {
        return (cart.reduce((total, item) => total + item.price * item.quantity, 0) + 4.90).toFixed(2);
    };

    return (
        <>
            <button type="button" className="btn btn-primary cart-button" data-bs-toggle="modal" data-bs-target="#cartModal">
                <i className="bi bi-cart-fill"></i>
                Mon panier 
                {
                    cartLength > 0 && (
                        <span className='cart_quantity'>{cartLength}</span>
                    )
                }
            </button>
            <PaiementsModal calculateTotal={calculateTotal} />
            <CartModal calculateTotal={calculateTotal} />
        </>
    );
};

export default Cart;
