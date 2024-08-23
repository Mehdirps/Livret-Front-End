import React from 'react';

const PlaceGroups = ({ data }) => {
    return (
        <div class="modal fade" id="placeGroupsModal" tabindex="-1" aria-labelledby="placeGroupsModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="placeGroupsModalLabel">Ajouter un groupe et un lieu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <h6>Groupes</h6>
                            {
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((group, index) => (
                                                <tr key={index}>
                                                    <td>{group.name}</td>
                                                    <td>
                                                        <button type="submit" class="btn btn-danger">Supprimer</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            }
                            <form>
                                <div class="mb-3">
                                    <label for="groupName" class="form-label">Nom du groupe</label>
                                    <input type="text" class="form-control" id="groupName" name="groupName" required />
                                </div>
                                <button type="submit" class="btn btn-primary">Ajouter un groupe</button>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PlaceGroups;