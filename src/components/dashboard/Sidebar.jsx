import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import SupportContact from './SupportContact';
import Cart from './shop/cart/Cart';

const Sidebar = ({ toggleSidebar }) => {
    const livret = useSelector(state => state.livret.livret);

    return (
        <>
            <div
                className={`d-flex flex-column p-3 text-white bg-dark sidebar`}
                style={{ zIndex: 2000, position: 'fixed', top: 0, bottom: 0, left: 0, width: '250px', overflowY: 'auto' }}
            >
                <button
                    className="btn-close btn-close-white d-md-none"
                    onClick={() => toggleSidebar()}
                    style={{ marginLeft: 'auto' }}
                ></button>

                <NavLink onClick={() => toggleSidebar()} to="/dashboard" className="d-flex flex-column align-items-center mb-3 mb-md-0 text-white text-decoration-none">
                    <figure className='logo'>
                        <img src="./img/logo.png" alt="Logo de site Heberginfos" />
                    </figure>
                    <span className="fs-4">Dashboard</span>
                </NavLink>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item w-100">
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard" className="nav-link text-white">
                            <i className="bi bi-speedometer2"></i> Tableau de bord
                        </NavLink>
                    </li>
                    <li className="nav-item w-100 dropdown">
                        <Link className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-book"></i> Mon livret d'accueil
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link onClick={() => toggleSidebar()} className="dropdown-item" to="/dashboard/edit_livret">Editer</Link></li>
                            <li><Link onClick={() => toggleSidebar()} className="dropdown-item" to="/dashboard/background">Changer le fond</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            {livret && <li><Link className="dropdown-item" to={`/livret/${livret.slug}/${livret.id}`} target="_blank">Voir</Link></li>}
                        </ul>
                    </li>
                    <li>
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard/stats" className="nav-link text-white">
                            <i className="bi bi-graph-up"></i> Statistiques
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard/inventories" className="nav-link text-white">
                            <i className="bi bi-journal-text"></i> Etats de lieux
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard/suggestions" className="nav-link text-white">
                            <i className="bi bi-file-earmark-bar-graph"></i> Mes suggestions
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard/profil" className="nav-link text-white">
                            <i className="bi bi-person"></i> Mon profil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard/shop" className="nav-link text-white">
                            <i className="bi bi-shop"></i> Notre boutique
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => toggleSidebar()} to="/dashboard/orders" className="nav-link text-white">
                            <i className="bi bi-cart-check"></i> Mes commandes
                        </NavLink>
                    </li>
                    <hr />
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
                <hr />
                <Cart />
                <hr />
                <SupportContact />
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#shareModal">
                    Partager
                </button>
            </div>
        </>
    );
};

export default Sidebar;
