/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";

import Loading from "../../components/Loading";
import FAQ from "../../components/dashboard/FAQ";


const DashboardIndex = () => {
    const livret = useSelector(state => state.livret.livret);

    return (
        <div className="container">
            <div className="row">
                {
                    livret ?
                        <div className="col-12">
                            <h1>Bienvenue sur votre livret d'accueil - <strong>{livret.livret_name}</strong></h1>
                            <p>Vous êtes actuellement sur le livret d'accueil de votre entreprise. Vous pouvez consulter
                                les
                                informations importantes de votre entreprise, les documents à lire, les formations à
                                suivre,
                                etc.</p>
                            <p>Vous pouvez également consulter les statistiques de votre entreprise, les informations
                                importantes,
                                etc.</p>
                            {/*    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}*/}
                        </div>
                        :
                        <Loading/>
                }
            </div>
            <FAQ/>
        </div>
    );
};

export default DashboardIndex;
