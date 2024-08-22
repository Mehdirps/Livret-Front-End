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
        <p className='btn btn-danger' onClick={() => handleRemove()}>
            <i className="bi bi-trash"></i>
        </p>
    );
};

export default RemoveProduct;