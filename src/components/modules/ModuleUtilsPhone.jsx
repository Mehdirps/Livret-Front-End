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

const ModuleUtilsPhone = ({ data }) => {
    return (
        <>
            <div className="col-lg-2 col-md-3 col-sm-6">
                <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#utilsPhoneModal">
                    <div className="card text-center w-100">
                        <i className="bi bi-telephone-fill"></i>
                        Numéros utiles
                    </div>
                </button>
            </div>
            <div className="modal fade" id="utilsPhoneModal" tabIndex="-1" aria-labelledby="utilsPhoneModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="utilsPhoneModalLabel">Numéros utiles</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Vous trouverez ici toutes les numéros dont vous pouvez avoir besoin</p>
                            {data.length > 0 && (
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Numéro</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td><a href={`tel:${item.number}`}>{item.number}</a></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModuleUtilsPhone;
