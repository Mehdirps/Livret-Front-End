/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setSuccess, setError } from "../../../stores/slices/livretSlice";


const PasswordProfileForm = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);

    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handlePasswordChange = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + 'dashboard/profile/update_password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                old_password: oldPassword,
                password: password,
                password_confirmation: passwordConfirmation
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    dispatch(setError({ error: data.error }));
                } else {
                    dispatch(setSuccess({ success: data.message}));
                    setOldPassword('');
                    setPassword('');
                    setPasswordConfirmation('');
                }
            })
            .catch(error => dispatch(setError({ error: error })));
    }

    return (
        <form id="update-password-form" onSubmit={handlePasswordChange} className="p-5 bg-light rounded">
            <h3><i className="bi bi-key"></i> Changer mon mot de passe</h3>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="old_password">Mot de passe actuel</label>
                    <input type="password" className="form-control" id="old_password" name="old_password"
                        placeholder="Votre mot de passe actuel" required value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)} />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input type="password" className="form-control" id="password" name="password"
                        placeholder="Votre nouveau mot de passe" required value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="password_confirmation">Confirmation nouveau mot de passe</label>
                    <input type="password" className="form-control" id="password_confirmation"
                        name="password_confirmation" placeholder="Confirmez votre nouveau mot de passe" required
                        value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                </div>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Changer mon mot de passe</button>
        </form>
    );
};

export default PasswordProfileForm;
