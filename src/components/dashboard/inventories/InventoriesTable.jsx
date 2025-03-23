/**
 * Copyright (c) 2025 Mehdi Raposo
 * Ce fichier fait partie du projet Heberginfos.
 *
 * Ce fichier, ainsi que tout le code et les ressources qu'il contient,
 * est protégé par le droit d'auteur. Toute utilisation, modification,
 * distribution ou reproduction non autorisée est strictement interdite
 * sans une autorisation écrite préalable de Mehdi Raposo.
 */
import React from 'react';
import InventoryDelete from './InventoryDelete';
import InventoryStatus from './InventoryStatus';

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
                               <InventoryStatus inventory={inventory} />
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
                                <InventoryDelete id={inventory.id} />
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
