import React from 'react';

const InventoriesTable = ({ inventories }) => {
    return (
        <div className="table-responsive">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nom du client</th>
                        <th>Date d'arrivée</th>
                        <th>Date de départ</th>
                        <th>Commentaire du client</th>
                        <th>Status</th>
                        <th>Pièces jointes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventories.length > 0 ? inventories.map((inventory) => (
                        <tr key={inventory.id} data-status={inventory.status} className="tr_data">
                            <td>{inventory.client_name}</td>
                            <td>{inventory.start_date}</td>
                            <td>{inventory.end_date}</td>
                            <td>{inventory.client_comment}</td>
                            <td>
                                <form>
                                    <select
                                        name="status"
                                        className="form-control status"
                                        value={inventory.status}
                                    >
                                        <option value="in_progress">En cours</option>
                                        <option value="completed">Terminé</option>
                                    </select>
                                </form>
                            </td>
                            <td>
                                {inventory.attachment_names ? (
                                    JSON.parse(inventory.attachment_names).length > 0 ? (
                                        JSON.parse(inventory.attachment_names).map((attachment, index) => (
                                            <>
                                                <a
                                                    key={index}
                                                    href={`${process.env.REACT_APP_URL}${attachment}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {attachment.replace('assets/uploads/inventory_attachments/', '')}
                                                </a>
                                                <br />
                                            </>
                                        ))
                                    ) : 'Aucune pièce jointe'
                                ) : 'Aucune pièce jointe'}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7">Aucun état des lieux trouvé</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InventoriesTable;