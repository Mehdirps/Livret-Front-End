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
import { useSelector, useDispatch } from 'react-redux';
import { setCart } from '../../../../stores/slices/cartSlice';

const RemoveProduct = ({ productId }) => {
    const cart = useSelector(state => state.cart.cart);

    const dispatch = useDispatch();

    const handleRemove = () => {
        const newCart = cart.filter(product => product.id !== productId);
        dispatch(setCart({ cart: newCart }));
    }

    return (
        <button className='btn btn-danger' onClick={handleRemove} aria-label="Remove product">
            <i className="bi bi-trash"></i>
        </button>
    );
};

export default RemoveProduct;
