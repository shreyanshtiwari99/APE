const express = require('express');
const Teacher = require('../models/teacher.js');
const router = express.Router();
const Student = require('../models/student.js');
router.post('/signup', async (req, res) => {
    console.log('teacher post route');
    const teacher = new Teacher({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        phoneno:req.body.phoneno,
       
    })
    try{
    const result = await teacher.save();
    console.log(result);
    res.send('teacher signed up');
}
catch(e){
    console.log(e.message);
}
})

router.post('/login', async (req, res) => {
    console.log('teacher login route');
    Teacher.findOne({ email: req.body.email, password: req.body.password}, function (err, docs) {
        if (err){
            console.log(err);
        }
        if(!docs){
            console.log('No teacher found with that email and password');
            res.send("no record found in database");;
    }
        else{
            console.log("Here are the teacher etails : ", docs);
            res.send(docs.email,docs.userType);
        }
    }) 
})

router.get('/getStudents', async (req,res) =>{
    const students = await Student.find();

  res.send(students);
})




module.exports = router;