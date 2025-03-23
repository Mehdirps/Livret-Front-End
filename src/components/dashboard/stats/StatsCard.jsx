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

const StatsCard = ({data, bgColor, title}) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6">
            <div className={`card text-white bg-${bgColor} mb-3`}>
                <div className="card-header">{title}</div>
                <div className="card-body">
                    <h5 className="card-title">{data}</h5>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
