// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import livretReducer from './slices/livretSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        livret : livretReducer,
    },
});

export default store;
