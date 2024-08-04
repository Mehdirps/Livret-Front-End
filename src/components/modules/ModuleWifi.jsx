import React from 'react';

const ModuleWifi = ({ data }) => {
    return (
        <>
            <div className="col-lg-4 col-md-4 col-sm-6">
                <button type="button" className="btn w-100" data-bs-toggle="modal" data-bs-target="#wifiModal">
                    <div className="card text-center w-100">
                        <i className="bi bi-wifi"></i>
                        Wifi
                    </div>
                </button>
            </div>
            <div className="modal fade" id="wifiModal" tabindex="-1" aria-labelledby="wifiModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="wifiModalLabel">WiFi</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Pour vous connecter à notre réseau Wifi, veuillez accéder aux paramètres Wifi de votre appareil</p>
                            {data.length > 0 && (
                                <table className="table table-striped mt-3">
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Code</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(item => (
                                        <tr key={item.id}>
                                            <td>{item.ssid}</td>
                                            <td>{item.password}</td>
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

export default ModuleWifi;
