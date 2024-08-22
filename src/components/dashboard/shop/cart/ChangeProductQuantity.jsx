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
