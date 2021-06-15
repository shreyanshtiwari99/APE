const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {type:String, required:true},
    marks: {type:Number, required:true}
})
const Subject = mongoose.model('Subject', subjectSchema);


const studentSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    rollno: {type: Number, required:true},
    semester: {type:Number, required:true},
    section: {type:String, required:true}, 
    phoneno: {type:Number, required:true},
    subjects: [subjectSchema]
})
const Student = mongoose.model('Student', studentSchema);





module.exports = Student;
