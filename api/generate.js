const { PDFDocument, StandardFonts } = require("pdf-lib");

module.exports = async (req, res) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("PDF OK", { x: 50, y: 780, size: 14, font });

    const bytes = await pdfDoc.save();

    res.setHeader("Content-Type", "application/pdf");
    return res.status(200).send(Buffer.from(bytes));
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};