/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
// livretSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    livret: null,
    modules: null,
    success: null,
    error: null,
};

const livretSlice = createSlice({
    name: 'livret',
    initialState,
    reducers: {
        setLivret: (state, action) => {
            state.livret = action.payload.livret;
        },
        clearLivret: (state) => {
            state.livret = null;
            state.modules = null;
            sessionStorage.removeItem('livret');
            sessionStorage.removeItem('modules');
        },
        setModules: (state, action) => {
            state.modules = action.payload.modules;
        },
        setSuccess: (state, action) => {
            state.success = action.payload.success;
        },
        setError: (state, action) => {
            state.error = action.payload.error;
        },
    },
});

export const { setLivret, setModules, setError, setSuccess, clearLivret } = livretSlice.actions;
export default livretSlice.reducer;
