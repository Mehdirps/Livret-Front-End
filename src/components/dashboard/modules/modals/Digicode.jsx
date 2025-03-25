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

const ModuleDigicode = ({data}) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [name, setName] = useState("");
    const [code, setCode] = useState("");

    const addModuleDigicode = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('code', code);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/digicode', {
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
                setCode('');
            } else {
                dispatch(setSuccess({success: data.message}));
                setName('');
                setCode('');
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
            setName('');
            setCode('');
        });
    }

    return (
        <div className="modal fade" id="digicodeModal" tabIndex="-1" aria-labelledby="digicodeModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {
                            data.length > 0 ?
                                <table className="table table-striped">
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
                                                <td>{item.name}</td>
                                                <td>{item.code}</td>
                                                <td>
                                                    <DeleteModule module="digicode" id={item.id}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                : <p>Aucun digicode</p>
                        }
                    </div>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="wifiModalLabel">Ajouter un digicode</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="wifiForm" onSubmit={addModuleDigicode}>
                                    <div className="mb-3">
                                        <label for="name" className="form-label">Nom</label>
                                        <input type="text" className="form-control" id="name" name="name" required
                                               onChange={(e) => setName(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label for="code" className="form-label">Code</label>
                                        <input type="text" className="form-control" id="code" name="code" required
                                               onChange={(e) => setCode(e.target.value)}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary" id="saveDigicode">Sauvegarder</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ModuleDigicode;
