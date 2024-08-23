import React from 'react';

const ModuleWifi = ({ data }) => {
    return (
        <div class="modal fade" id="wifiModal" tabindex="-1" aria-labelledby="wifiModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        {
                            data.length > 0 &&
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Code</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.ssid}</td>
                                                <td>{item.password}</td>
                                                <td>
                                                    <button type="submit" class="btn btn-danger">Supprimer</button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        }
                    </div>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="wifiModalLabel">Ajouter un WiFi</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="wifiForm" method="post">
                                    <div class="mb-3">
                                        <label for="wifiName" class="form-label">Nom du WiFi</label>
                                        <input type="text" class="form-control" id="wifiName" name="wifiName" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="wifiPassword" class="form-label">Mot de passe du WiFi</label>
                                        <input type="text" class="form-control" id="wifiPassword" name="wifiPassword" required />
                                    </div>
                                    <button type="submit" class="btn btn-primary" id="saveWifi">Sauvegarder</button>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ModuleWifi;
