import React from 'react';
import LivretSuggestionForm from './LivretSuggestionForm';

const LivretFooter = ({ livret }) => {
    return (
        <footer className="container mb-5 livret-footer">
            {livret.suggest ? <LivretSuggestionForm livretId={livret.id} /> : null}
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
    );
};

export default LivretFooter;