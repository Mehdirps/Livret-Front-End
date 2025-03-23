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
import { useSelector, useDispatch } from 'react-redux';
import { setSuccess, setError } from '../../../stores/slices/livretSlice';


const InventoryDelete = ({ id }) => {

    const dispatch = useDispatch();

    const token = useSelector(state => state.user.token);

    const handleDelete = () => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(setError({ error: data.error }));
                    return;
                }
                dispatch(setSuccess({ success: data.message}));
            })
            .catch(err => setError({ error: err }));
    }

    return (
        <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => {
                if (window.confirm('Voulez-vous vraiment supprimer cet état des lieux ?')) {
                    handleDelete();
                    e.target.closest('tr').remove();
                }
            }}
        >
            Supprimer
        </button>
    );
};

export default InventoryDelete;
