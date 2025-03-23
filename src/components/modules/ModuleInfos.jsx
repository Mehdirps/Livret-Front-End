import React from 'react';

const ModuleInfos = ({ data }) => {
    return (
        <>
            <div className="col-lg-2 col-md-3 col-sm-6">
                <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#infoModal">
                    <div className="card text-center w-100">
                        <i className="bi bi-house-door-fill"></i>
                        L'établissement
                    </div>
                </button>
            </div>
            <div className="modal fade" id="infoModal" tabIndex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="infoModalLabel">Informations de l'établissement</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <h2>{data.establishment_name}</h2>
                                        <div className="establishment-details mt-3">
                                            <p><i className="bi bi-geo-alt-fill me-2"></i> <strong>Adresse:</strong> {data.establishment_address}</p>
                                            <p><i className="bi bi-telephone-fill me-2"></i> <strong>Téléphone:</strong> {data.establishment_phone}</p>
                                            <p><i className="bi bi-envelope-fill me-2"></i> <strong>Email:</strong> {data.establishment_email}</p>
                                            <p><i className="bi bi-globe me-2"></i> <strong>Site web:</strong> <a href={data.establishment_website} target="_blank" rel="noopener noreferrer">{data.establishment_website}</a></p>
                                            <p><i className="bi bi-building me-2"></i> <strong>Type:</strong> {data.establishment_type}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModuleInfos;
