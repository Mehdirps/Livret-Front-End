// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: sessionStorage.getItem('token') || null,
    first_login: sessionStorage.getItem('first_login') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.first_login = action.payload.user.first_login;
            
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('first_login', action.payload.user.first_login);
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.first_login = null;

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('first_login');
        },
        setUserAfterUpdate: (state, action) => {
            state.user = action.payload.user;
        }
    },
});

export const { setUser, clearUser,setUserAfterUpdate } = userSlice.actions;
export default userSlice.reducer;
