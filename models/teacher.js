const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstname: {type:String, required:true},
    lastname: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}, 
    phoneno: {type:Number, required:true},
    userType: {type:Number, default:1}
})
const Teacher = mongoose.model('Teacher', teacherSchema);





module.exports = Teacher;
