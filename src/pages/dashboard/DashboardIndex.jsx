import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setLivret} from "../../stores/slices/livretSlice";
import Loading from "../../components/Loading";
import FAQ from "../../components/dashboard/FAQ";
import { setError } from '../../stores/slices/livretSlice';

const DashboardIndex = () => {

    const token = useSelector(state => state.user.token);
    const livret = useSelector(state => state.livret.livret);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then(response => response.json())
            .then(data => {
                dispatch(setLivret({livret: data.livret}));
            })
            .catch((error) => {
                dispatch(setError({ error: error }));
            });
    }, []);

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