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
