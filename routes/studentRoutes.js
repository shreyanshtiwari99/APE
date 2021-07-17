const express = require('express');
const {validateStudent, Student} = require('../models/student');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
//signup
router.post('/signup', async (req, res) => {
    console.log('student signup route');
    const {error} = validateStudent(req.body);
    if(error)
    return res.status(400).send(error.details[0].message);

    //check if email is not already registered
    let email = await Student.findOne({email: req.body.email});
    if(email)
        return res.status(400).send('email already registered');

    try{
    const student = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        rollno:req.body.rollno,
        semester:req.body.semester,
        section:req.body.section,
        phoneno:req.body.phoneno,
        userType: 0
    })

    const salt  = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(student.password, salt);
  
    const result = await student.save();

    const token  = student.generateToken();
    res.header('x-auth-token', token).send({
        _id: user._id,
        email: user.email,
        name: user.name
    });
    
}
catch(err) {
    console.log("Ye aaya aeror",err.message);
    res.status(400).send("There was some error in signup: "+err.message);
}
    

})


//login
router.post('/login', async (req, res) => {
    console.log('student login route');
    const {error} = validate(req.body);
 
    if(error)
        return res.status(400).send(error.details[0].message);

     //check if user is not already registered
     let student = await Student.findOne({email: req.body.email});
     if(!student)
         return res.status(400).send('Invalid email or password');

     const validPassword = await bcrypt.compare(req.body.password, student.password);

     if(!validPassword)
     return res.status(400).send('Invalid email or password');   

     const token = jwt.sign({email: student.email}, config.get('jwtPrivateKey'));
    res.send(token);
     
  
})


//send student marks 
router.post('/getMarks',auth, async(req,res) => {
    console.log(req.body.email);
   
    await Student.findOne({email: req.body.email})
    .then(() =>{
        console.log(Student.subjects);
        if(!Student.subjects)
            res.send('No subjects information entered for this student');
        res.send(Student.subjects);
    })
    .catch(err =>{
        console.log(err.message);
        res.status(404).send("there was some error "+err.message);
    });
    
  
})


//save marks to database
router.post('/subjectdetails', async (req, res) =>{
    console.log('student subject marks route');
    console.log(req.body);
try{
    const student = await Student.findOne({email: req.body.email});
    
    
      Student.findOneAndUpdate({email: req.body.email}, { subjects: [...student.subjects,...req.body.subjects] }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send('subject marks successfully entered');
        }
      });
    
    console.log(res);
}
catch(err){
    console.log(err.message);
    res.send(err.message);
}
})



//put marks
// router.put('/subjectdetails', async (req, res) =>{
//     console.log('student subject marks route');


//     const student = await Student.findOne({email: req.body.email});
    
    
//       Student.findOneAndUpdate({subjects.name: req.body.sname}, { subjects: [...student.subjects,...req.body.subjects] }, function(err, result) {
//         if (err) {
//           res.send(err);
//         } else {
//           res.send('subject marks successfully entered');
//         }
//       });
   
//     console.log(res);
// })

    
function validate(req){
    const schema =Joi.object({
        email: Joi.string().required().email(),
        password: Joi.required()
    });

   return schema.validate(req);
}

module.exports = router;