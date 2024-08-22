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
