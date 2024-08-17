import React from 'react';

const LivretFooter = ({ livret }) => {
    return (
        <footer className="container mb-5">
            {livret.suggest && (
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
            )}
            <div className="row socials d-flex flex-row justify-content-center">
                {livret.establishmentWebsite && (
                    <div className='col-md-2 d-flex justify-content-center'>
                        <a href={livret.establishmentWebsite} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-globe website-icon" style={{ color: '#0a66c2' }}></i> {/* Couleur pour le site web */}
                        </a>
                    </div>
                )}
                {livret.instagram && (
                    <div className='col-md-2 d-flex justify-content-center'>
                        <a href={livret.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-instagram instagram-icon" style={{ color: '#E1306C' }}></i>
                        </a>
                    </div>
                )}
                {livret.facebook && (
                    <div className='col-md-2 d-flex justify-content-center'>
                        <a href={livret.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-facebook facebook-icon" style={{ color: '#1877F2' }}></i>
                        </a>
                    </div>
                )}
                {livret.linkedin && (
                    <div className='col-md-2 d-flex justify-content-center'>
                        <a href={livret.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-linkedin linkedin-icon" style={{ color: '#0A66C2' }}></i>
                        </a>
                    </div>
                )}
                {livret.twitter && (
                    <div className='col-md-2 d-flex justify-content-center'>
                        <a href={livret.twitter} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-twitter twitter-icon" style={{ color: '#1DA1F2' }}></i>
                        </a>
                    </div>
                )}
                {livret.tripadvisor && (
                    <div className='col-md-2 d-flex justify-content-center'>
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