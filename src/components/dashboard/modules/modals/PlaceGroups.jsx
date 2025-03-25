/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, {useState} from 'react';
import DeleteModule from "../DeleteModule";
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../../stores/slices/livretSlice';

const PlaceGroups = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [groupName, setGroupName] = useState("");

    const addModulePlaceGroup = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('groupName', groupName);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/places_groups', {
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
                setGroupName('');
            } else {
                dispatch(setSuccess({success: data.message}));
                setGroupName('');
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
            setGroupName('');
        });
    }
    return (
        <div className="modal fade" id="placeGroupsModal" tabIndex="-1" aria-labelledby="placeGroupsModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="placeGroupsModalLabel">Ajouter un groupe et un lieu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <h6>Groupes</h6>
                            {
                                data.length > 0 ?
                                    <table className="table table-striped">
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
                                                        <DeleteModule module="places_groups" id={group.id}/>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                    : <p>Aucun groupe</p>
                            }
                            <form onSubmit={(e) => addModulePlaceGroup(e)}>
                                <div className="mb-3">
                                    <label for="groupName" className="form-label">Nom du groupe</label>
                                    <input type="text" className="form-control" id="groupName" name="groupName" required
                                           onChange={(e) => setGroupName(e.target.value)} value={groupName}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Ajouter un groupe</button>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PlaceGroups;
