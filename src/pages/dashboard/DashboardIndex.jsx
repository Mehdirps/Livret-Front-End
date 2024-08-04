import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {setLivret} from "../../stores/slices/livretSlice";
import Loading from "../../components/Loading";

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
                console.error('Error:', error);
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
            <div className="col-12">
                <h2>Comment fonctionne l'application</h2>
                <div className="accordion" id="faqAccordion">
                    <div className="accordion-item">
                        <h3 className="accordion-header" id="headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Comment modifier mes informations et celle de mon livret ?
                            </button>
                        </h3>
                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                             data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Pour modifier vos informations, vous devez vous rendre dans la section "Mon profil" de
                                votre
                                compte. Vous pouvez modifier votre nom, prénom, email, mot de passe, etc. Pour modifier
                                les
                                informations de votre livret, vous devez vous rendre dans la section "Mon profil". Vous
                                pouvez modifier le nom de votre livret, la description, ajout un logo etc.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h3 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Comment changer le fond d'écran de mon livret ?
                            </button>
                        </h3>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                             data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Pour changer le fond d'écran de votre livret, vous devez vous rendre dans la section
                                "Mon
                                livret d'accueil" de votre compte. Vous pouvez choisir un fond parmi les images
                                disponibles. Plusieurs catégories d'images sont disponibles.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h3 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Comment fonctionne les statistiques ?
                            </button>
                        </h3>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                             data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Les statistiques vous permettent de voir le nombre de vue de votre livret en vous
                                rendant dans la section "Statistiques" de votre compte. Vous pouvez voir le nombre de
                                vues par jour, par semaine, par mois, et sélectionner une période personnalisée.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h3 className="accordion-header" id="headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Comment voir mon livret en tant qu'utilisateur ?
                            </button>
                        </h3>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                             data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Pour voir votre livret en tant qu'utilisateur, vous devez vous rendre dans la section
                                "Mon livret d'accueil" de votre compte et cliquer sur "voir".
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h3 className="accordion-header" id="headingFive">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                Comment nous contacter ?
                            </button>
                        </h3>
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive"
                             data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Pour nous contacter, rien de plus simple. Cliquez sur le bouton "Nous contacter" en bas
                                de la page et remplissez le formulaire de contact. Nous vous recontacterons dans les
                                plus brefs délais.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardIndex;