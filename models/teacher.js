const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}, 
    phone: {type:Number, required:true},
    isHod: {type:Boolean, required:true}
})
const Teacher = mongoose.model('Teacher', teacherSchema);





module.exports = Teacher;
