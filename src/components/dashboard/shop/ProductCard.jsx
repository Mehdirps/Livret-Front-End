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
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../stores/slices/cartSlice';


const ProductCard = ({ product }) => {

    const cart = useSelector(state => state.cart.cart);

    const dispatch = useDispatch();

    const addToCart = (product) => {
        if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([]));
        }

        const newCart = [...cart];

        const existingProductIndex = newCart.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            const updatedProduct = { ...newCart[existingProductIndex] };
            updatedProduct.quantity += 1;

            newCart[existingProductIndex] = updatedProduct;
        } else {
            const productToAdd = { ...product, quantity: 1 };
            newCart.push(productToAdd);
        }

        dispatch(setCart({ cart: newCart }));
    };


    return (
        <div className="col-md-4 col-6">
            <div className="card h-100">
                <img
                    src={process.env.REACT_APP_URL + product.image}
                    className="card-img-top"
                    alt={product.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">{product.price} €</p>
                    <div className="btn btn-primary" onClick={() => {
                        addToCart(product);
                    }}>Ajouter</div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
