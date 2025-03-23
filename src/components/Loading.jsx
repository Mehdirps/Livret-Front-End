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

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-animation">
                <div className="loading-spinner"></div>
                <div className="loading-text">Chargement...</div>
                <div className="loading-subtext">Merci de patienter un instant</div>
            </div>
        </div>
    );
};

export default Loading;
