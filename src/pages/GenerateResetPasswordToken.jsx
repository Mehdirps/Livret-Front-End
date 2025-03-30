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
import Error from '../components/Error';
import Success from '../components/Success';

const GenerateResetPasswordToken = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState('');
    const [localSuccess, setLocalSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setLocalError('');
        setLocalSuccess('');

        if (!email || !email.includes('@')) {
            setLocalError('Veuillez entrer une adresse email valide.');
            return;
        }

        setIsLoading(true);
        
        fetch(`${process.env.REACT_APP_API_URL}auth/generate_reset_password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
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
                }
            })
            .catch(error => {
                setIsLoading(false);
                setLocalError('Une erreur est survenue. Veuillez réessayer.');
                setLocalSuccess('');
            });
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Réinitialisation du mot de passe</h2>
                            <p className="text-center mb-4">Entrez votre email pour recevoir un lien de réinitialisation</p>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Votre adresse email"
                                        required
                                    />
                                </div>
                                
                                {localError ? (
                                    <Error error={localError} />
                                ) : null}
                                {localSuccess ? (
                                    <Success success={localSuccess} />
                                ) : null}
                                {isLoading ? (
                                    <div className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                ) : null}
                                
                                <div className="d-grid gap-2 mt-4">
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? 'Envoi en cours...' : 'Réinitialiser le mot de passe'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateResetPasswordToken;