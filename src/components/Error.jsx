import React, { useState } from 'react';

const Error = ({ error }) => {

    const [show, setShow] = useState(true);

    return (
        <>
            {
                show &&
                <div className="modal d-block" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Erreur</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="alert alert-danger" role="alert">
                                    {error}
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

export default Error;