import React from 'react';

const RemoveProduct = ({ productId, setCart }) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const handleRemove = () => {
        const newCart = cart.filter(product => product.id !== productId);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    }

    return (
        <p className='btn btn-danger' onClick={() => handleRemove()}>
            <i className="bi bi-trash"></i>
        </p>
    );
};

export default RemoveProduct;