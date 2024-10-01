const express = require('express')
const router = express.Router()
const multer = require('multer');
const { students } = require('../Model/model');


// Configuration de Multer pour l'upload de fichiers
const upload = multer();
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { certificateNumber, studentName } = req.body;
    const pdfFile = req.file.buffer;
    const pdfFileName = req.file.originalname;

    const student = new students({
      certificateNumber,
      studentName,
      pdfFile,
      pdfFileName
    });

    await student.save();
    res.status(201).json({ message: 'Certificat uploadé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'upload du certificat' });
  }
});

  // Route pour la vérification du certificat
router.get('/verify/:certificateNumber', async (req, res) => {
    try {
      const student = await students.findOne({ certificateNumber: req.params.certificateNumber });
      if (student) {
        res.json({
          studentName: student.studentName,
          certificateNumber: student.certificateNumber,
          pdfFileName: student.pdfFileName
        });
      } else {
        res.status(404).json({ error: 'Certificat non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

  
// Route pour télécharger le PDF
router.get('/pdf/:certificateNumber', async (req, res) => {
    try {
      const student = await students.findOne({ certificateNumber: req.params.certificateNumber });
      if (student && student.pdfFile) {
        res.contentType('application/pdf');
        res.send(student.pdfFile);
      } else {
        res.status(404).json({ error: 'PDF non trouvé' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  });

  module.exports = router;