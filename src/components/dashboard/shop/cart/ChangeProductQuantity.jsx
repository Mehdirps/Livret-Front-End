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

const ChangeProductQuantity = ({ product }) => {
    const cart = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value);

        const newCart = cart.map(item => {
            if (item.id === product.id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        dispatch(setCart({ cart: newCart }));
    }

    return (
        <input 
            style={{ width: '70px' }} 
            className='form-control' 
            type="number" 
            value={product.quantity}
            onChange={(e) => {
                if (e.target.value > 0) {
                    handleChange(e);
                }
            }} 
        />
    );
};

export default ChangeProductQuantity;
