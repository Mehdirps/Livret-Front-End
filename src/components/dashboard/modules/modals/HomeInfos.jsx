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
import {useDispatch, useSelector} from 'react-redux';
import {setError, setSuccess} from '../../../../stores/slices/livretSlice';

const ModuleHomeInfos = ({ data }) => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [title, setTitle] = useState(data.name);
    const [text, setText] = useState(data.text);

    const saveHomeInfos = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', title);
        formData.append('text', text);

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/home_infos', {
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
            } else {
                dispatch(setSuccess({success: data.message}));
            }
        }).catch((error) => {
            dispatch(setError({error: error}));
        });
    }

    
    return (
        <div className="modal fade" id="homeInfosModal" tabIndex="-1" aria-labelledby="homeInfosModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="wifiModalLabel">Ajouter/modifier le mot d'accueil</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="wifiForm" onSubmit={(e) => saveHomeInfos(e)}>
                            <div className="mb-3">
                                <label for="name" className="form-label">Titre</label>
                                <input type="text" className="form-control" id="name" name="name" required defaultValue={title} onChange={(e) => setTitle(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label for="text" className="form-label">Message</label>
                                <textarea className="form-control" id="text" name="text" rows="3" required onChange={(e) => setText(e.target.value)}>{text}</textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" id="saveWifi">Sauvegarder</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ModuleHomeInfos;
