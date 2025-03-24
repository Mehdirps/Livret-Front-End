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
import { useSelector, useDispatch } from "react-redux";
import { setError } from '../../../stores/slices/livretSlice';

const DeleteAccount = () => {
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    const deleteAccount = () => {
        if (window.confirm('Voulez-vous vraiment supprimer votre compte ? La suppression est définitive, cela veux dire que vous perdrez toutes les données relatives à votre compte et votre livret.')) {
            fetch(process.env.REACT_APP_API_URL + 'auth/deleteAccount/' + token, {
                method: 'DELETE',
            }).then(response => response.json())
                .then(data => {
                    if (data.error) {
                       dispatch(setError({ error: data.error }));
                    } else {
                        alert(data.message);
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }
                })
                .catch(error => alert(error));
        }
    }

    return (
        <div className='btn btn-danger' onClick={() => deleteAccount()}>Supprimer mon compte</div>
    );
};

export default DeleteAccount;