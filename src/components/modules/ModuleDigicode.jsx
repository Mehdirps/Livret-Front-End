import React from 'react';

const ModuleDigicode = ({ data }) => {
    return (
        <>
            <div className="col-lg-2 col-md-3 col-sm-6">
                <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#digicodeModal">
                    <div className="card text-center w-100">
                        <i className="bi bi-key-fill"></i>
                        Digicode
                    </div>
                </button>
            </div>
            <div className="modal fade" id="digicodeModal" tabIndex="-1" aria-labelledby="digicodeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="digicodeModalLabel">Digicode</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Voici les digicodes dont vous aurez besoin pendant votre séjour !</p>
                            {data.length > 0 && (
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.code}</td>
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

export default ModuleDigicode;
