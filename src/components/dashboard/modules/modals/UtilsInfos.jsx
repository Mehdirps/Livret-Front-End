import React, {useState} from 'react';
import DeleteModule from "../DeleteModule";
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../../stores/slices/livretSlice';

const ModuleUtilsInfos = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [sub_name, setSubName] = useState("");
    const [text, setText] = useState("");

    const addModuleUtilsInfo = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('sub_name', sub_name);
        formData.append('text', text);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/utils_infos', {
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
                setSubName('');
                setText('');
            } else {
                dispatch(setSuccess({success: data.message}));
                setSubName('');
                setText('')
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
            setSubName('');
            setText('')
        });
    }

    return (
        <div class="modal fade" id="utilsInfosModal" tabindex="-1" aria-labelledby="utilsInfosModalLabel"
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
                                                <td>{item.sub_name}</td>
                                                <td>{item.text}</td>
                                                <td>
                                                    <DeleteModule module="utils_infos" id={item.id}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                : <p>Aucune information utile</p>
                        }
                    </div>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="wifiModalLabel">Ajouter une info utile</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="wifiForm" onSubmit={(e) => addModuleUtilsInfo(e)}>
                                    <div class="mb-3">
                                        <label for="sub_name" class="form-label">Nom</label>
                                        <input type="text" class="form-control" id="sub_name" name="sub_name" required
                                               onChange={(e) => setSubName(e.target.value)}/>
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

export default ModuleUtilsInfos;