import React from 'react';

const ModuleUtilsInfos = ({ data }) => {
    return (
        <div class="modal fade" id="utilsInfosModal" tabindex="-1" aria-labelledby="utilsInfosModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        {
                            data.length > 0 &&
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Infos</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.sub_name}</td>
                                                <td>{item.text}</td>
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
                                <h5 class="modal-title" id="wifiModalLabel">Ajouter une info utile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="wifiForm">
                                    <div class="mb-3">
                                        <label for="sub_name" class="form-label">Nom</label>
                                        <input type="text" class="form-control" id="sub_name" name="sub_name" required />
                                    </div>
                                    <div class="mb-3">
                                        <label for="text" class="form-label">Texte</label>
                                        <textarea class="form-control" id="text" name="text" required></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-primary" id="saveDigicode">Sauvegarder</button>
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

export default ModuleUtilsInfos;