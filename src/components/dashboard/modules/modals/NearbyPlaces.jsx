import React, {useEffect, useState} from 'react';
import DeleteModule from "../DeleteModule";
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../../stores/slices/livretSlice';

const NearbyPlaces = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const livret = useSelector(state => state.livret.livret);

    const [placeName, setPlaceName] = useState("");
    const [placeGroup, setPlaceGroup] = useState("");
    const [placeAddress, setPlaceAddress] = useState("");
    const [placePhone, setPlacePhone] = useState("");
    const [travelTime, setTravelTime] = useState("");
    const [placeDescription, setPlaceDescription] = useState("");

    const [placeGroups, setPlaceGroups] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/places_groups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.error) {
                dispatch(setError({error: data.error}));
            } else {
                setPlaceGroups(data.placeGroups);
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
        });
    }, []);

    const addModuleNearbyPlaces = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('placeName', placeName);
        formData.append('placeGroup', placeGroup);
        formData.append('placeAddress', placeAddress);
        formData.append('placePhone', placePhone);
        formData.append('travelTime', travelTime);
        formData.append('placeDescription', placeDescription);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/nearby_places', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: formData
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.error) {
                dispatch(setError({error: data.error}));
                setPlaceName('');
                setPlaceGroup('');
                setPlaceAddress('');
                setPlacePhone('');
                setTravelTime('');
                setPlaceDescription('');
            } else {
                dispatch(setSuccess({success: data.message}));
                setPlaceName('');
                setPlaceGroup('');
                setPlaceAddress('');
                setPlacePhone('');
                setTravelTime('');
                setPlaceDescription('');
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
            setPlaceName('');
            setPlaceGroup('');
            setPlaceAddress('');
            setPlacePhone('');
            setTravelTime('');
            setPlaceDescription('');
        });
    }

    return (
        <div class="modal fade" id="nearbyPlacesModal" tabIndex="-1" aria-labelledby="nearbyPlacesModalLabel"
             aria-hidden="true">
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
                                data.length > 0 ?

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
                                                        {
                                                            place.place_group_id ?
                                                                placeGroups.find(group => group.id === place.place_group_id) ?
                                                                    <td>{placeGroups.find(group => group.id === place.place_group_id).name}</td>
                                                                    : <td></td>
                                                                : <td></td>
                                                        }
                                                        <td></td>
                                                        <td>
                                                            <DeleteModule module="nearby_places" id={place.id}/>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    : <p>Aucun lieu</p>
                            }
                            <form onSubmit={(e) => addModuleNearbyPlaces(e)}>
                                <div class="mb-3">
                                    <label for="placeName" class="form-label">Nom du lieu</label>
                                    <input type="text" class="form-control" id="placeName" name="placeName" required
                                           onChange={(e) => setPlaceName(e.target.value)} value={placeName}/>
                                </div>
                                <div class="mb-3">
                                    <label for="placeGroup" class="form-label">Groupe</label>
                                    {
                                        placeGroups.length > 0 ?
                                            <select class="form-select" id="placeGroup" name="placeGroup" required
                                                    onChange={(e) => setPlaceGroup(e.target.value)}>
                                                <option disabled selected>-- Choisir un groupe --</option>
                                                {
                                                    placeGroups.map((group, index) => (
                                                        <option key={index} value={group.id}>{group.name}</option>
                                                    ))
                                                }
                                            </select>
                                            : <p>Aucun groupe</p>
                                    }
                                </div>
                                <div class="mb-3">
                                    <label for="placeAddress" class="form-label">Adresse du lieu</label>
                                    <input type="text" class="form-control" id="placeAddress" name="placeAddress"
                                           required onChange={(e) => setPlaceAddress(e.target.value)}
                                           value={placeAddress}/>
                                </div>
                                <div class="mb-3">
                                    <label for="placePhone" class="form-label">Téléphone du lieu</label>
                                    <input type="text" class="form-control" id="placePhone" name="placePhone"
                                           onChange={(e) => setPlacePhone(e.target.value)} value={placePhone}/>
                                </div>
                                <div class="mb-3">
                                    <label for="travelTime" class="form-label">Temps de trajet</label>
                                    <input type="text" class="form-control" id="travelTime" name="travelTime"
                                           onChange={(e) => setTravelTime(e.target.value)} value={travelTime}/>
                                </div>
                                <div class="mb-3">
                                    <label for="placeDescription" class="form-label">Description du lieu</label>
                                    <textarea class="form-control" id="placeDescription" name="placeDescription"
                                              onChange={(e) => setPlaceDescription(e.target.value)}
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