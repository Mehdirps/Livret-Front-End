import React from 'react';

const ErrorModal = ({ error }) => {
    return (
        <div className="modal d-block" role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Une erreur est survenue</h5>
                        <button type="button" className="btn-close" aria-label="Close" data-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
