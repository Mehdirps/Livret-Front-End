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

const InventoryStatus = ({ inventory }) => {
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;

        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                status: value,
                inventory_id: inventory.id
            })
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
        <select
            name="status"
            className="form-control status"
            value={inventory.status}
            onChange={(e) => handleChange(e)}
        >
            <option value="in_progress">En cours</option>
            <option value="completed">Terminé</option>
        </select>
    );
};

export default InventoryStatus;
