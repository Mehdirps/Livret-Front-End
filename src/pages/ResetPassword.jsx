/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React, { useState, useEffect } from 'react';
import Error from '../components/Error';
import Success from '../components/Success';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const [localSuccess, setLocalSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const emailParam = queryParams.get('email');
        const tokenParam = queryParams.get('token');
        
        if (emailParam) setEmail(emailParam);
        if (tokenParam) setToken(tokenParam);
        
        if (!emailParam || !tokenParam) {
            setLocalError('Lien de réinitialisation invalide. Veuillez vérifier l\'URL ou demander un nouveau lien.');
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLocalError('');
        setLocalSuccess('');

        if (!email || !token) {
            setLocalError('Lien de réinitialisation invalide. Veuillez vérifier l\'URL ou demander un nouveau lien.');
            return;
        }

        if (!password || password.length < 8) {
            setLocalError('Le mot de passe doit contenir au moins 8 caractères.');
            return;
        }

        if (password !== confirmPassword) {
            setLocalError('Les mots de passe ne correspondent pas.');
            return;
        }

        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}auth/reset_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token, password, confirmPassword }),
        })
            .then(response => response.json())
            .then(data => {
                setIsLoading(false);
                if (data.error) {
                    setLocalError(data.error);
                    setLocalSuccess('');
                } else {
                    setLocalSuccess(data.message);
                    setLocalError('');

                    setTimeout(() => {
                        navigate('/connexion');
                    }
                    , 3000);
                }
            })
            .catch(error => {
                setIsLoading(false);
                setLocalError('Une erreur est survenue. Veuillez réessayer.');
                setLocalSuccess('');
            });
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Réinitialisation du mot de passe</h2>
                            {localError && <Error error={localError} />}
                            {localSuccess && <Success success={localSuccess} />}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className={`btn btn-primary ${isLoading ? 'disabled' : ''}`}>
                                    {isLoading ? 'Chargement...' : 'Réinitialiser le mot de passe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;