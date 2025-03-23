import React, {useState} from 'react';
import DeleteModule from "../DeleteModule";
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../../stores/slices/livretSlice';

const ModuleEndInfos = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [name, setName] = useState("");
    const [text, setText] = useState("");

    const addModuleEndInfo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('text', text);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/end_info', {
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
                setName('');
                setText('');
            } else {
                dispatch(setSuccess({success: data.message}));
                setName('');
                setText('')
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
            setName('');
            setText('')
        });
    }
    return (
        <div class="modal fade" id="endInfosModal" tabIndex="-1" aria-labelledby="endInfosModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        {
                            data.length > 0 ?
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
                                                <td>{item.name}</td>
                                                <td>{item.text}</td>
                                                <td>
                                                    <DeleteModule module="end_info" id={item.id}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                : <p>Aucune information de départ</p>
                        }
                    </div>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="wifiModalLabel">Ajouter une info de départ</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="wifiForm" onSubmit={(e) => addModuleEndInfo(e)}>
                                    <div class="mb-3">
                                        <label for="name" class="form-label">Nom</label>
                                        <input type="text" class="form-control" id="name" name="name" required
                                               onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="text" class="form-label">Texte</label>
                                        <textarea class="form-control" id="text" name="text" required
                                                  onChange={(e) => setText(e.target.value)}></textarea>
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

export default ModuleEndInfos;