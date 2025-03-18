import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector, useDispatch } from "react-redux";
import { setSuccess } from "../../../stores/slices/livretSlice";

const ExportPdfButton = ({ suggestions }) => {
  const dispatch = useDispatch();

  const livret = useSelector((state) => state.livret.livret);
  const handleExportPdf = () => {
    const doc = new jsPDF();

    doc.text(`Suggestion du livret "${livret.livret_name}"`, 15, 10);

    doc.autoTable({
      startY: 20,
      head: [["Nom", "Email", "Titre", "Message", "Statut"]],
      body: suggestions.map((s) => [
        s.name,
        s.email,
        s.title,
        s.message,
        s.status,
      ]),
    });

    doc.save("suggestions.pdf");
    dispatch(
      setSuccess({ success: "Le fichier PDF a été exporté avec succès" })
    );
  };

  return (
    <button className="btn btn-primary" onClick={() => handleExportPdf()}>
      Exporter en PDF
    </button>
  );
};

export default ExportPdfButton;
