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
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess } from '../stores/slices/livretSlice';

const LivretSuggestionForm = ({ livretId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [rgpd, setRgpd] = useState('');
    const [open, setOpen] = useState(true);

    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + 'suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                name,
                email,
                title,
                message,
                rgpd,
                livret_id: livretId
            })
        }).then(response => response.json())
            .then(data => {
                if (data.error) {
                    dispatch(setError({ error: data.error }));
                } else {
                    dispatch(setSuccess({ success: data.message }));
                    setName('');
                    setEmail('');
                    setTitle('');
                    setMessage('');
                    setRgpd('');
                    setOpen(false);

                    setTimeout(() => {
                        setOpen(true);
                    }, 5000);
                }
            });

    };

    return (
        <>
            <div className="row">
                <button
                    type="button"
                    className="btn btn-primary col-3 mx-auto mb-5"
                    data-bs-toggle="modal"
                    data-bs-target="#suggestionModal"
                >
                    Envoyer une suggestion
                </button>
            </div>
            {
                open && (
                    <div className="modal fade" id="suggestionModal" tabIndex="-1" aria-labelledby="suggestionModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="suggestionModalLabel">Envoyer une suggestion</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Votre nom</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                name="name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Votre e-mail</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Titre</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                name="title"
                                                required
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea
                                                className="form-control"
                                                id="message"
                                                name="message"
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="rgpd"
                                                name="rgpd"
                                                required
                                                checked={rgpd}
                                                onChange={(e) => setRgpd(e.target.checked)}
                                            />
                                            <label className="form-check-label" htmlFor="rgpd">
                                                J'accepte que mes données soient utilisées pour traiter ma demande
                                            </label>
                                        </div>
                                        <input type="hidden" name="livret_id" value={livretId} />
                                        <button type="submit" className="btn btn-primary">Envoyer</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default LivretSuggestionForm;
