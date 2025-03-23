/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, {useState} from 'react';
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import {Helmet} from "react-helmet";

const Authentification = () => {

    const [openLogin, setOpenLogin] = useState(sessionStorage.getItem('openLogin') === 'true');

    return (
        <div className="p-5">
            <Helmet>
                <title>Connexion / Inscription - Heberginfos</title>
                <meta name="description" content="Connectez-vous ou inscrivez-vous sur Heberginfos pour créer votre livret d'accueil en ligne qui sera accessible par vos visiteurs." />
            </Helmet>
            {
                openLogin ?
                    <LoginForm setOpenLogin={setOpenLogin}/>
                    :
                    <RegisterForm setOpenLogin={setOpenLogin}/>
            }

        </div>
    );
};

export default Authentification;
