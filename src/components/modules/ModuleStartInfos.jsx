import React from 'react';

const ModuleStartInfos = ({ data }) => {
    return (
        <>
            <div className="col-lg-4 col-md-4 col-sm-6">
                <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#startInfosModal">
                    <div className="card text-center w-100">
                        <i className="bi bi-info-circle-fill"></i>
                        Infos arrivée
                    </div>
                </button>
            </div>
            <div className="modal fade" id="startInfosModal" tabindex="-1" aria-labelledby="startInfosModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="startInfosModalLabel">Infos d'arrivée</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Vous trouverez ici toutes les informations concernant votre arrivée dans notre établissement</p>
                            {data.length > 0 && (
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Infos</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.text}</td>
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

export default ModuleStartInfos;
