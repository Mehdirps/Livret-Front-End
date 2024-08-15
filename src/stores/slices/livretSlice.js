// livretSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    livret: JSON.parse(sessionStorage.getItem('livret')) || null,
    modules: JSON.parse(sessionStorage.getItem('modules')) || null,
    success: null,
    error: null,
};

const livretSlice = createSlice({
    name: 'livret',
    initialState,
    reducers: {
        setLivret: (state, action) => {
            state.livret = action.payload.livret;
            sessionStorage.setItem('livret', JSON.stringify(action.payload.livret));
        },
        setModules: (state, action) => {
            state.modules = action.payload.modules;
            sessionStorage.setItem('modules', JSON.stringify(action.payload.modules));
        },
        setSuccess: (state, action) => {
            state.success = action.payload.success;
        },
        setError: (state, action) => {
            state.error = action.payload.error;
        },
    },
});

export const { setLivret, setModules, setError, setSuccess } = livretSlice.actions;
export default livretSlice.reducer;
