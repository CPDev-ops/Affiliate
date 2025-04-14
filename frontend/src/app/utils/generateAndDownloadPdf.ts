import jsPDF from "jspdf";

export const generateAndDownloadPdf = (data: any) => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Resumen de Actividad", 20, 20);

    doc.setFontSize(12);
    doc.text(`Empresa: ${data.razon_social_empresa}`, 20, 40);
    doc.text(`Año: ${data.anio}`, 20, 50);
    doc.text(`Mes: ${data.mes}`, 20, 60);
    doc.text(`Monto: $${data.monto || "0"}`, 20, 70);
    doc.text(`Estado: ${data.periodos_estado}`, 20, 80);

    doc.save("resumen.pdf"); // Descarga automática
};
