import React from 'react';

const ModuleInfos = ({ data }) => {
    return (
        <>
            <div className="col-lg-2 col-md-3 col-sm-6">
                <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#infoModal">
                    <div className="card text-center w-100">
                        <i class="bi bi-house"></i>
                        L'établissement
                    </div>
                </button>
            </div>
            <div className="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="infoModalLabel">Informations de l'établissement</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModuleInfos;
