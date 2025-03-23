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

const InventoriesFilter = ({inventories, setFilteredInventories}) => {

    const filterInventories = (e) => {

        const status = e.target.id;

        if (status === 'all') {
            setFilteredInventories(inventories);
        } else if (status === 'completed') {
            setFilteredInventories(inventories.filter(inventory => inventory.status === status));
        } else if (status === 'in_progress') {
            setFilteredInventories(inventories.filter(inventory => inventory.status === status));
        }
    }


    return (
        <div className="row">
            <div className="col-md-3 btn btn-primary" id="all" onClick={(e) => filterInventories(e)}>
                Tout
            </div>
            <div className="col-md-3 btn btn-success" id="completed" onClick={(e) => filterInventories(e)}>
                Terminées
            </div>
            <div className="col-md-3 btn btn-danger" id="in_progress" onClick={(e) => filterInventories(e)}>
                En cours
            </div>
        </div>
    );
};

export default InventoriesFilter;
