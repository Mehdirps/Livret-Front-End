import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoutButton from "../auth/LogoutButton";
import {useSelector} from "react-redux";

const Sidebar = () => {

    const livret = useSelector(state => state.livret.livret)
    const id = livret.id;
    const slug = livret.slug;

    return (
        <div className="d-flex flex-column p-3 text-white bg-dark sidebar h-100">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Dashboard</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item w-100">
                    <NavLink to="/dashboard" className="nav-link text-white">
                        <i className="bi bi-speedometer2"></i> Tableau de bord
                    </NavLink>
                </li>
                <li className="nav-item w-100 dropdown">
                    <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button"
                       data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-book"></i> Mon livret d'accueil
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="/dashboard/edit_livret">Editer</Link></li>
                        <li><Link className="dropdown-item" to="/dashboard/background">Changer le fond</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to={`/livret/${slug}/${id}`}>Voir</Link></li>
                    </ul>
                </li>
                <li>
                    <NavLink to="/dashboard/stats" className="nav-link text-white">
                        <i className="bi bi-graph-up"></i> Statistiques
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/inventories" className="nav-link text-white">
                        <i className="bi bi-journal-text"></i> Etats de lieux
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/suggestions" className="nav-link text-white">
                        <i className="bi bi-file-earmark-bar-graph"></i> Mes suggestions
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/profil" className="nav-link text-white">
                        <i className="bi bi-person"></i> Mon profil
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/products" className="nav-link text-white">
                        <i className="bi bi-shop"></i> Notre boutique
                    </NavLink>
                </li>
                <li>
                    <LogoutButton/>
                </li>
            </ul>
            <hr />
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#contactModal">
                Nous contacter
            </button>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#shareModal">
                Partager
            </button>
        </div>
    );
};

export default Sidebar;
