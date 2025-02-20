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
        <div class="modal fade" id="placeGroupsModal" tabindex="-1" aria-labelledby="placeGroupsModalLabel"
             aria-hidden="true">
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
                                data.length > 0 ?
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
                                <div class="mb-3">
                                    <label for="groupName" class="form-label">Nom du groupe</label>
                                    <input type="text" class="form-control" id="groupName" name="groupName" required
                                           onChange={(e) => setGroupName(e.target.value)} value={groupName}/>
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