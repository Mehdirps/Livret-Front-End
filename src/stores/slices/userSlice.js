// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    first_login: localStorage.getItem('token') || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.first_login = action.payload.user.first_login;

            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('first_login', action.payload.user.first_login);
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.first_login = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('first_login');
        },
        setUserAfterUpdate: (state, action) => {
            state.user = action.payload.user;
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        }
    },
});

export const { setUser, clearUser,setUserAfterUpdate } = userSlice.actions;
export default userSlice.reducer;
