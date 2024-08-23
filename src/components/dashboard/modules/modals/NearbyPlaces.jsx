import React from 'react';

const NearbyPlaces = ({ data }) => {
    return (
        <div class="modal fade" id="nearbyPlacesModal" tabindex="-1" aria-labelledby="nearbyPlacesModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="nearbyPlacesModalLabel">Ajouter un groupe et un lieu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div>
                            <h6>Lieux</h6>
                            {
                                data.length > 0 &&

                                <div class="table-responsive">

                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Adresse</th>
                                                <th>Téléphone</th>
                                                <th>Temps de trajet</th>
                                                <th>Description</th>
                                                <th>Groupe</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((place, index) => (
                                                    <tr key={index}>
                                                        <td>{place.name}</td>
                                                        <td>{place.address}</td>
                                                        <td>{place.phone}</td>
                                                        <td>{place.travel_time}</td>
                                                        <td>{place.description}</td>
                                                        {/* <td>{place.placeGroup.name}</td> */}
                                                        <td></td>
                                                        <td>
                                                            <button type="submit" class="btn btn-danger">Supprimer</button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            }
                            <form>
                                <div class="mb-3">
                                    <label for="placeName" class="form-label">Nom du lieu</label>
                                    <input type="text" class="form-control" id="placeName" name="placeName" required />
                                </div>
                                <div class="mb-3">
                                    <label for="placeGroup" class="form-label">Groupe</label>
                                    {/* <select class="form-control" id="placeGroup" name="placeGroup" required>
                                    <option selected disabled>-- Choisir un groupe --</option>
                                    @foreach($livret->placeGroups as $group)
                                        <option value="{{ $group->id }}">{{ $group->name }}</option>
                                    @endforeach
                                </select> */}
                                </div>
                                <div class="mb-3">
                                    <label for="placeAddress" class="form-label">Adresse du lieu</label>
                                    <input type="text" class="form-control" id="placeAddress" name="placeAddress" required />
                                </div>
                                <div class="mb-3">
                                    <label for="placePhone" class="form-label">Téléphone du lieu</label>
                                    <input type="text" class="form-control" id="placePhone" name="placePhone" />
                                </div>
                                <div class="mb-3">
                                    <label for="travelTime" class="form-label">Temps de trajet</label>
                                    <input type="text" class="form-control" id="travelTime" name="travelTime" />
                                </div>
                                <div class="mb-3">
                                    <label for="placeDescription" class="form-label">Description du lieu</label>
                                    <textarea class="form-control" id="placeDescription" name="placeDescription"
                                    ></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary">Ajouter un lieu</button>
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

export default NearbyPlaces;