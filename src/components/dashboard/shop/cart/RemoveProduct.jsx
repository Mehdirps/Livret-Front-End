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