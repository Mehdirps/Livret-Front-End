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
import { useSelector, useDispatch } from 'react-redux';
import { setError, setSuccess } from '../../../stores/slices/livretSlice';

const InventoryAddForm = () => {
    const token = useSelector(state => state.user.token);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clientName, setClientName] = useState('');
    const [status, setStatus] = useState('');
    const [clientComment, setClientComment] = useState('');
    const [attachmentNames, setAttachmentNames] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('start_date', startDate);
        formData.append('end_date', endDate);
        formData.append('client_name', clientName);
        formData.append('status', status);
        formData.append('client_comment', clientComment);

        attachmentNames.forEach((file) => {
            formData.append('attachment_names[]', file);
        });

        fetch(process.env.REACT_APP_API_URL + 'dashboard/inventories', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    dispatch(setError({ error: data.error }));
                } else {
                    dispatch(setSuccess({ success: data.message }));
                    window.location.reload();
                }
            })
            .catch(err => dispatch(setError({ error: err })));

    };

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addInventoryModal">
                Ajouter un état des lieux
            </button>
            <div className="modal fade" id="addInventoryModal" tabIndex="-1" aria-labelledby="addInventoryModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addInventoryModalLabel">Ajouter un état des lieux</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="addInventoryForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="start_date" className="form-label">Date d'arrivée</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="start_date"
                                        name="start_date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="end_date" className="form-label">Date de départ</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="end_date"
                                        name="end_date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="client_name" className="form-label">Nom du client</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="client_name"
                                        name="client_name"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>-- Status --</option>
                                        <option value="in_progress">En cours</option>
                                        <option value="completed">Terminé</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="client_comment" className="form-label">Commentaire du client</label>
                                    <textarea
                                        className="form-control"
                                        id="client_comment"
                                        name="client_comment"
                                        value={clientComment}
                                        onChange={(e) => setClientComment(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="attachment_names" className="form-label">Pièces jointes</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="attachment_names"
                                        name="attachment_names[]"
                                        multiple
                                        accept=".pdf,.png,.jpeg,.webp,.jpg,.xlsx,.xls,.doc,.docx,.odt,.ods,.ppt,.pptx"
                                        onChange={(e) => setAttachmentNames([...e.target.files])}
                                        aria-describedby="filesHelp"
                                    />
                                    <div id="filesHelp" className="form-text">
                                        Vous pouvez sélectionner plusieurs fichiers. Seuls les fichiers .pdf, .png, .jpeg, .webp, .jpg, .xlsx, .xls, .doc, .docx, .odt, .ods, .ppt, .pptx sont autorisés.
                                    </div>
                                </div>
                                <input type="submit" value="Ajouter" className="btn btn-primary" />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InventoryAddForm;
