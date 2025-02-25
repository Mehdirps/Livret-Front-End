import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../stores/slices/livretSlice';

const SupportContact = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [rgpd, setRgpd] = useState(null);

    const [open, setOpen] = useState(true);

    const token = useSelector(state => state.user.token);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + 'dashboard/module/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                subject,
                message,
                rgpd
            })
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    dispatch(setSuccess({ success: data.message }));
                    setSubject('');
                    setMessage('');
                    setRgpd(null);
                    setOpen(false);

                    setTimeout(() => {
                        setOpen(true);
                    }, 1000);
                } else {
                    dispatch(setError({ error: data.error }));
                }
            })
            .catch(() => {
                dispatch(setError({ error: 'Erreur lors de l\'envoi du message' }));
            });
    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#supportContactModal">
                Contacter le support
            </button>
            <>
                {
                    open &&
                    <div className="modal fade text-dark" id="supportContactModal" tabIndex="-1" aria-labelledby="supportContactModalLabel" aria-hidden="true" data-testid="support-contact-modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="supportContactModalLabel">Contacter le support</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="subject" className="form-label">Sujet</label>
                                            <select
                                                id="subject"
                                                className="form-select"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>-- Sélectionnez un sujet --</option>
                                                <option value="technical">Problème technique</option>
                                                <option value="billing">Facturation</option>
                                                <option value="general">Demande générale</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Message</label>
                                            <textarea
                                                id="message"
                                                className="form-control"
                                                rows="5"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-3 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="rgpdCheck"
                                                checked={rgpd}
                                                onChange={(e) => setRgpd(e.target.checked)}

                                            />
                                            <label className="form-check-label" htmlFor="rgpdCheck">
                                                J'accepte les conditions RGPD
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Envoyer</button>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        </>
    );
};

export default SupportContact;
