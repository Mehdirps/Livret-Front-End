import React from 'react';
import { clearUser } from "../../stores/slices/userSlice";
import { clearLivret } from '../../stores/slices/livretSlice';
import { useDispatch } from "react-redux";

const LogoutButton = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
        dispatch(clearLivret());
    }

    return (
        <div className="btn btn-danger" onClick={() => handleLogout()}>
            <i className="bi bi-box-arrow-right"></i> Déconnexion
        </div>
    );
};

export default LogoutButton;