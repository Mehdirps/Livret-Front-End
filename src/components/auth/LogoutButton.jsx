/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from 'react';
import { clearUser } from "../../stores/slices/userSlice";
import { clearLivret } from '../../stores/slices/livretSlice';
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearUser());
        dispatch(clearLivret());
        navigate("/");

    }

    return (
        <div className="btn btn-danger" onClick={() => handleLogout()}>
            <i className="bi bi-box-arrow-right"></i> Déconnexion
        </div>
    );
};

export default LogoutButton;
