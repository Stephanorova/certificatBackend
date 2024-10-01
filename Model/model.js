
const mongoose = require('mongoose')



const EtudiantShema = new mongoose.Schema({
  certificateNumber: String,
  studentName: String,
  pdfFile: Buffer,
  pdfFileName: String
})

const students = mongoose.model('students', EtudiantShema)
exports.students = students; 