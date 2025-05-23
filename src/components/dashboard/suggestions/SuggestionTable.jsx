/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { setError, setSuccess } from "../../../stores/slices/livretSlice";

const SuggestionTable = ({suggestions,setRequestSuccess}) => {

    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

    const handleStatusChange = (e) => {
        const id = e.target.getAttribute('data-id');

        fetch(process.env.REACT_APP_API_URL + 'dashboard/suggestion/status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                suggestion_id: id,
                status_suggest: e.target.value,
            })
        })
            .then(response => response.json())
            .then(data => {
                setRequestSuccess(true)
                dispatch(setSuccess({success: data.message}));
            })
            .catch(error => dispatch(setError({error: error})));
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">Email</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Message</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {suggestions.map(suggestion => (
                    <tr data-status={suggestion.status} className="tr_data">
                        <td>{suggestion.name}</td>
                        <td>{suggestion.email}</td>
                        <td>{suggestion.title}</td>
                        <td>{suggestion.message}</td>
                        <td>
                            <select name="status_suggest" id="status_suggest"
                                    className="form-control status_suggest"
                                    onChange={(e) => handleStatusChange(e)} data-id={suggestion.id}>
                                <option value="pending" selected={suggestion.status === 'pending'}>En attente
                                </option>
                                <option value="accepted" selected={suggestion.status === 'accepted'}>Accepté
                                </option>
                                <option value="refused" selected={suggestion.status === 'refused'}>Refusé</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuggestionTable;
