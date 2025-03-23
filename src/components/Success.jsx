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

const Success = ({ success }) => {

    const [show, setShow] = useState(true);

    return (
        <>
            {
                show &&
                <div className="modal d-block" role="dialog" style={{ display: 'block', zIndex:10000000 }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Succès</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Success;
