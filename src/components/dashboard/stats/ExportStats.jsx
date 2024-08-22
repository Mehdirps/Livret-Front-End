import React from 'react';
import jsPDF from "jspdf";
import "jspdf-autotable";
import {useSelector, useDispatch} from "react-redux";
import {setSuccess} from "../../../stores/slices/livretSlice";

const ExportStats = ({ data }) => {
    const dispatch = useDispatch();

    const livret = useSelector(state => state.livret.livret);
    const handleExportPdf = () => {
        const doc = new jsPDF();

        doc.text(`Statistiques des vues de livret ${livret.livret_name}`, 15, 10);

        doc.autoTable({
            startY: 20,
            head: [['Titre', 'Données']],
            body: [
                ['Total des vues', data.totalViews],
                ['Vues du jour', data.viewsToday],
                ['Vues de la semaine', data.viewsThisWeek],
                ['Vues du mois', data.viewsThisMonth],
                // ...(data.viewsBetweenDates ? [['Vues entre deux dates', `Du ${data.startDate} au ${data.endDate}: ${data.viewsBetweenDates}`]] : []),
            ],
        });

        doc.save('statistiques_vues.pdf');
        dispatch(setSuccess({success: 'Le fichier PDF a été exporté avec succès'}));
    }

    return (
        <button id="exportPdf" className="btn btn-primary" onClick={handleExportPdf}>
            Exporter en PDF
        </button>
    );
};

export default ExportStats;
