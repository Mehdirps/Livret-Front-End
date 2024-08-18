import React, { useState } from 'react';
import CartModal from './CartModal';
import PaiementsModal from './PaiementsModal';

const Cart = () => {


    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartModal">
                <i className="bi bi-cart-fill"></i>
                Mon panier
            </button>
            <CartModal />
        </>
    );
};

export default Cart;
