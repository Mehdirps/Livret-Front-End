/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, {useState} from 'react';
import { useSelector } from 'react-redux';

const InventoriesSearchForm = ({setFilteredInventories}) => {
    const token = useSelector(state => state.user.token);

    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                client_name: name,
                start_date: startDate,
                end_date: endDate,
                status
            })
        })
            .then(res => res.json())
            .then(data => {
                setFilteredInventories(data.inventories);
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={(e) => handleSearch(e)}>
            <div className="row">
                <div className="col-md-4">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nom du client"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="date"
                        name="start_date"
                        className="form-control"
                        defaultValue={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="date"
                        name="end_date"
                        className="form-control"
                        defaultValue={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        name="status"
                        id="status"
                        className="form-control"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Status</option>
                        <option value="in_progress">En cours</option>
                        <option value="completed">Terminé</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-primary">Rechercher</button>
                </div>
            </div>
        </form>
    );
};

export default InventoriesSearchForm;
