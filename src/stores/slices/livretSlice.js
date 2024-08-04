// livretSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    livret : JSON.parse(localStorage.getItem('livret')) || null,
    modules : JSON.parse(localStorage.getItem('modules')) || null,
};

const livretSlice = createSlice({
    name: 'livret',
    initialState,
    reducers: {
        setLivret: (state, action) => {
            state.livret = action.payload.livret;
            localStorage.setItem('livret', JSON.stringify(action.payload.livret));
        },
        setModules: (state, action) => {
            state.modules = action.payload.modules;
            localStorage.setItem('modules', JSON.stringify(action.payload.modules));
        },
    },
});

export const { setLivret, setModules} = livretSlice.actions;
export default livretSlice.reducer;
