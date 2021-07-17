const express = require('express');
const {Teacher,validateTeacher} = require('../models/teacher');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const isTeacher = require('../middleware/isTeacher');
const Joi = require('joi');
const {Student} = require('../models/student');


router.post('/signup', async (req, res) => {
    console.log('teacher post route');
    const{error} = validateTeacher(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    //check if email is not already registered
    let email = await Teacher.findOne({email: req.body.email});
    if(email)
        return res.status(400).send('email already registered');

        

        const salt  = await bcrypt.genSalt(10);
        hashedpassword = await bcrypt.hash(req.body.password, salt);

    let teacher = new Teacher({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedpassword,
        email: req.body.email,
        phoneno:req.body.phoneno,
       userType: 1
    })
    try{
        
    const result = await teacher.save();

        const token = teacher.generateToken();
    res.header('x-auth-token', token).send({
        _id: teacher._id,
        email: teacher.email,
        name: teacher.name
    });
  
}
catch(e){
    console.log(e.message);
    res.send(e.message);
}
})

router.post('/login', async (req, res) => {
    console.log('teacher login route');
    const {error} = validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);

     //check if user is not already registered
     let teacher = await Teacher.findOne({email: req.body.email});
     if(!teacher)
         return res.status(400).send('Invalid email or password');

     const validPassword = await bcrypt.compare(req.body.password, teacher.password);

     if(!validPassword)
     return res.status(400).send('Invalid email or password');   

     const token = teacher.generateToken();
    res.send(token);
     

})

router.get('/getStudents', [auth,isTeacher],async (req,res) =>{
    try{
    const students = await Student.find().select('-password').sort('firstname');

  res.send(students);
    }
    catch(e){
        console.log(e.message);
        res.send(e.message);
    }
})


function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.required()
    })

    return schema.validate(req);
}

module.exports = router;