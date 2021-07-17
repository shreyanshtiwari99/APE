const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const subjectSchema = new mongoose.Schema({
    name: {type:String, required:true},
    marks: {type:Number, required:true},
    examType: {type: String, required:true}
})
const Subject = mongoose.model('Subject', subjectSchema);


const studentSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String,unique: true, required:true},
    password: {type:String, required:true},
    rollno: {type: Number,unique: true, required:true},
    semester: {type:Number, required:true},
    section: {type:String, required:true}, 
    phoneno: {type:Number, required:true},
    userType: {type:Number, default: 0},
    subjects: [subjectSchema]
},{timestamps:true})

studentSchema.methods.generateToken = function(){
    const token = jwt.sign({email: this.email,userType: this.userType}, config.get('jwtPrivateKey'));
    return token;
}

const Student = mongoose.model('Student', studentSchema);


function validateStudent(student){
    const schema= Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        rollno: Joi.number().required(),
        semester: Joi.number().required(),
        section: Joi.string().required(),
        phoneno: Joi.number().required(),
        userType: Joi.number()
    });

    return schema.validate(student);
}


exports.Student = Student;
exports.validateStudent = validateStudent;
