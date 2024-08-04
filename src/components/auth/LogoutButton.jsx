import React from 'react';
import {clearUser} from "../../stores/slices/userSlice";
import {useDispatch} from "react-redux";

const LogoutButton = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(clearUser());
    }

    return (
        <div className="btn btn-danger" onClick={() => handleLogout()}>
            <i className="bi bi-box-arrow-right"></i> Déconnexion
        </div>
    );
};

export default LogoutButton;