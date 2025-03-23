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

const FaqItem = ({number, title, text}) => {
    return (
        <div className="accordion-item">
            <h3 className="accordion-header" id={`heading${number}`}>
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target={`#collapse${number}`} aria-expanded="true" aria-controls={`collapse${number}`}>
                    {title}
                </button>
            </h3>
            <div id={`collapse${number}`} className="accordion-collapse collapse" aria-labelledby={`heading${number}`}
                 data-bs-parent="#faqAccordion">
                <div className="accordion-body">
                    {text}
                </div>
            </div>
        </div>
    );
};

export default FaqItem;
