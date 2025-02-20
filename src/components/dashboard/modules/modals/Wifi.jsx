import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../../stores/slices/livretSlice';
import DeleteModule from "../DeleteModule";

const ModuleWifi = ({data}) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [wifiName, setWifiName] = useState("");
    const [wifiPassword, setWifiPassword] = useState("");

    const addModuleWifi = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('wifiName', wifiName);
        formData.append('wifiPassword', wifiPassword);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/wifi', {
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
                setWifiName('');
                setWifiPassword('');
            } else {
                dispatch(setSuccess({success: data.message}));
                setWifiName('');
                setWifiPassword('')
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
            setWifiName('');
            setWifiPassword('')
        });
    }

    return (
        <div class="modal fade" id="wifiModal" tabindex="-1" aria-labelledby="wifiModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        {
                            data.length > 0 ?
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
                                                    <DeleteModule module="wifi" id={item.id}/>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                    </tbody>
                                </table>
                                : <p>Aucun WiFi</p>
                        }
                    </div>
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="wifiModalLabel">Ajouter un WiFi</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form id="wifiForm" method="post" onSubmit={(e) => addModuleWifi(e)}>
                                    <div class="mb-3">
                                        <label for="wifiName" class="form-label">Nom du WiFi</label>
                                        <input type="text" class="form-control" id="wifiName" name="wifiName" required
                                               onChange={(e) => setWifiName(e.target.value)} defaultValue={wifiName}/>
                                    </div>
                                    <div class="mb-3">
                                        <label for="wifiPassword" class="form-label">Mot de passe du WiFi</label>
                                        <input type="text" class="form-control" id="wifiPassword" name="wifiPassword"
                                               required onChange={(e) => setWifiPassword(e.target.value)}
                                               defaultValue={wifiPassword}/>
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
