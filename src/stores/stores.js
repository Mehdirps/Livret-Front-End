// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import livretReducer from './slices/livretSlice';
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        livret : livretReducer,
        cart: cartReducer,
        
    },
});

export default store;
