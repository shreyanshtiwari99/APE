const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const teacherSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String,unique: true, required:true},
    password: {type:String, required:true}, 
    phoneno: {type:Number, required:true},
    userType: {type:Number, default:1},
    
},{timestamps:true})

teacherSchema.methods.generateToken = function(){
    const token = jwt.sign({email: this.email, userType: this.userType}, config.get('jwtPrivateKey'));
    return token;
}

const Teacher = mongoose.model('Teacher', teacherSchema);

function validateTeacher(teacher){
    const schema= Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phoneno: Joi.number().required(),
        userType: Joi.number(),
        
    });

    return schema.validate(teacher);
}


exports.Teacher = Teacher;
exports.validateTeacher = validateTeacher;
