const express = require('express');
const Student = require('../models/student.js');
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log('student signup route');
    const student = new Student({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        rollno:req.body.rollno,
        semester:req.body.semester,
        section:req.body.section,
        phoneno:req.body.phoneno
    })
  
    const result = await student.save();
    console.log(result);

})

router.post('/login', async (req, res) => {
    console.log('student login route');
    console.log("Email:",req.body.email);
    console.log("pass:",req.body.password);
    Student.findOne({ email: req.body.email, password: req.body.password}, function (err, docs) {
        if (err){
            console.log(err);
        }
        if(!docs)
            console.log('No student found with that email and password')
        else{
            console.log("Here are the student etails : ", docs);
            res.send(docs);
        }
    }) 
})




module.exports = router;