import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

const InventoriesExportPDF = ({ inventories }) => {

    const exportPdf = () => {
        const doc = new jsPDF();
    
        doc.autoTable({
            head: [['Nom du client', 'Date d\'arrivée', 'Date de départ', 'Commentaire du client', 'Status', 'Pièces jointes']],
            body: inventories.map(inventory => [
                inventory.client_name,
                inventory.start_date,
                inventory.end_date,
                inventory.client_comment,
                inventory.status,
                inventory.attachment_names ? (
                    JSON.parse(inventory.attachment_names).length > 0 ? (
                        JSON.parse(inventory.attachment_names)
                            .map(attachment => attachment.replace('assets/uploads/inventory_attachments/', ''))
                            .join(', ')
                    ) : 'Aucune pièce jointe'
                ) : 'Aucune pièce jointe'
            ])
        });
    
        doc.save('inventories.pdf');
    };
    

    return (
        <button type="button" className="btn btn-secondary" id="exportPdf" onClick={() => exportPdf()}>
            Exporter en PDF
        </button>
    );
};

export default InventoriesExportPDF;