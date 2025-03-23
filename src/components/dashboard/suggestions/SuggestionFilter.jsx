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

const SuggestionFilter = ({suggestionsToFiltered, setSuggestions}) => {

    const handleFilter = (e) => {
        const status = e.target.id;
        const filteredSuggestions = suggestionsToFiltered.filter(suggestion => suggestion.status === status);
        if (status === 'all') return setSuggestions(suggestionsToFiltered);

        setSuggestions(filteredSuggestions);
    }

    return (
        <div className="row">
            <div className="col-md-3 btn btn-primary" id="all" onClick={(e) => handleFilter(e)}>
                Tout
            </div>
            <div className="col-md-3 btn btn-success" id="accepted" onClick={(e) => handleFilter(e)}>
                Acceptées
            </div>
            <div className="col-md-3 btn btn-danger" id="refused" onClick={(e) => handleFilter(e)}>
                Refusées
            </div>
            <div className="col-md-3 btn btn-warning" id="pending" onClick={(e) => handleFilter(e)}>En attente
            </div>
        </div>
    );
};

export default SuggestionFilter;
