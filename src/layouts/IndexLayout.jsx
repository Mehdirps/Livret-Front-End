import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const IndexLayout = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <NavLink className="navbar-brand" to={'/'}>
                        <figure className='logo'>
                            <img src="./img/logo.png" alt="Logo de site Heberginfos" />
                        </figure>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/'}>Accueil</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={'/connexion'} onClick={() => {
                                    localStorage.setItem('openLogin', true);
                                }}>Inscription/Connexion</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
            <footer className='index_footer'>
                <div className="container">
                    <div className="footer_content">
                        <div className="footer_logo">
                            <figure className='logo'>
                                <img src="./img/logo.png" alt="Logo de site Heberginfos" />
                            </figure>
                        </div>
                        <div className="footer_links">
                            <h3>Liens utiles</h3>
                            <ul>
                                <li><NavLink to={'/'}>Accueil</NavLink></li>
                                <li><NavLink to={'/connexion'} onClick={() => {
                                    localStorage.setItem('openLogin', true);
                                }}>Inscription/Connexion</NavLink></li>
                                <li><NavLink to={'/mentions-legales'}>Mentions légales</NavLink></li>
                                <li><NavLink to={'/cgu'}>CGU</NavLink></li>
                                <li><NavLink to={'/cgv'}>CGV</NavLink></li>
                                <li><NavLink to={'/politique'}>Politique de confidentialité</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer_contact">
                            <h3>Contact</h3>
                            <div className="footer_contact_content">
                                <p>
                                    <a href="mailto:contact@heberginfos.fr">
                                        <i className="bi bi-envelope"></i>
                                    </a>
                                    <a href="tel:+33612345678">
                                        <i className="bi bi-telephone"></i>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer_legal">
                        <p className='copy'>&copy; 2025 Heberginfos - Tous droits réservés</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default IndexLayout;