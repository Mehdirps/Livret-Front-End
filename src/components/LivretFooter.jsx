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
import LivretSuggestionForm from './LivretSuggestionForm';

const LivretFooter = ({ livret }) => {
    return (
        <>
            {livret.suggest ? <LivretSuggestionForm livretId={livret.id} /> : null}
            <footer className="container mb-5 livret-footer">
                {livret.suggest ?
                    <div className="row">
                        <button
                            type="button"
                            className="btn btn-primary col-3 mx-auto mb-5"
                            data-bs-toggle="modal"
                            data-bs-target="#suggestionModal"
                        >
                            Envoyer une suggestion
                        </button>
                    </div>
                    : null}
                <div className="row socials">
                    {livret.establishmentWebsite && (
                        <div className='social-link'>
                            <a href={livret.establishmentWebsite} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-globe website-icon" style={{ color: '#0a66c2' }}></i> {/* Couleur pour le site web */}
                            </a>
                        </div>
                    )}
                    {livret.instagram && (
                        <div className='social-link'>
                            <a href={livret.instagram} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-instagram instagram-icon" style={{ color: '#E1306C' }}></i>
                            </a>
                        </div>
                    )}
                    {livret.facebook && (
                        <div className='social-link'>
                            <a href={livret.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-facebook facebook-icon" style={{ color: '#1877F2' }}></i>
                            </a>
                        </div>
                    )}
                    {livret.linkedin && (
                        <div className='social-link'>
                            <a href={livret.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-linkedin linkedin-icon" style={{ color: '#0A66C2' }}></i>
                            </a>
                        </div>
                    )}
                    {livret.twitter && (
                        <div className='social-link'>
                            <a href={livret.twitter} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-twitter twitter-icon" style={{ color: '#1DA1F2' }}></i>
                            </a>
                        </div>
                    )}
                    {livret.tripadvisor && (
                        <div className='social-link'>
                            <a href={livret.tripadvisor} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-globe tripadvisor-icon" style={{ color: '#34E0A1' }}></i> {/* Couleur pour TripAdvisor */}
                            </a>
                        </div>
                    )}
                </div>
            </footer>
        </>
    );
};

export default LivretFooter;
