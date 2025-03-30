/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: JSON.parse(localStorage.getItem(`cart-${localStorage.getItem('userId')}`)) || [],
    userId: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload.cart;
            localStorage.setItem(`cart-${state.userId}`, JSON.stringify(action.payload.cart));
        },
        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem(`cart-${state.userId}`);
        },
        setUserId: (state, action) => {
            state.userId = action.payload.userId;
            localStorage.setItem('userId', action.payload.userId);
        },
    },
});

export const { setCart, clearCart, setUserId } = cartSlice.actions;
export default cartSlice.reducer;
