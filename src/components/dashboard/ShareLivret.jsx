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
import { useSelector } from 'react-redux';

const ShareLivret = () => {
    const livret = useSelector((state) => state.livret.livret) || {};

    const shareUrl = `https://herbeginfos.fr/livret/${livret.slug}/${livret.id}`;

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Lien copié dans le presse-papier');
    };

    return (
        <div className="modal fade text-dark" id="shareModal" tabIndex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="shareModalLabel">Partagez mon livret</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12">
                                <h2>Partagez votre livret d'accueil</h2>
                                <p>
                                    Vous pouvez partager votre livret d'accueil avec vos collègues, amis, famille, etc.
                                    Pour cela, vous devez copier le lien ci-dessous et le partager.
                                </p>
                                <div className='qrcode'>
                                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}`} alt="QR Code" style={{display:'block',margin:'auto'}}/>
                                </div>
                                <div className="mt-2 mb-3 text-center">
                                    <span className="me-2">Télécharger le QR code:</span>
                                    <a href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}&download=1&format=png`} 
                                       className="btn btn-sm btn-outline-secondary me-2" 
                                       download="qrcode.png">
                                        PNG
                                    </a>
                                    <a href={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(shareUrl)}&download=1&format=svg`} 
                                       className="btn btn-sm btn-outline-secondary me-2" 
                                       download="qrcode.svg">
                                        SVG
                                    </a>
                                </div>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" value={shareUrl} id="shareLink" readOnly />
                                    <button className="btn btn-primary" type="button" onClick={copyLink}>Copier</button>
                                </div>
                                <h3>Vous pouvez également le partager sur les réseaux sociaux</h3>
                                <div className="d-flex justify-content-center">
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn"
                                    >
                                        <i className="bi bi-facebook"></i> Facebook
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn"
                                    >
                                        <i className="bi bi-twitter"></i> Twitter
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=Mon%20livret&summary=Voici%20mon%20livret%20d'accueil`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn"
                                    >
                                        <i className="bi bi-linkedin"></i> LinkedIn
                                    </a>
                                    <a
                                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Jetez un oeil à ce livret d'accueil : ${shareUrl}`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn"
                                    >
                                        <i className="bi bi-whatsapp"></i> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareLivret;
