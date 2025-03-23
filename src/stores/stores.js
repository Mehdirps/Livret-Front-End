/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
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
