const express = require('express');
const Student = require('../models/student.js');
const router = express.Router();


//signup
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
        phoneno:req.body.phoneno,

    })
  
    const result = await student.save();
    console.log(result);
    

})


//login
router.post('/login', async (req, res) => {
    console.log('student login route');
    console.log("Email:",req.body.email);
    console.log("pass:",req.body.password);
    Student.findOne({ email: req.body.email, password: req.body.password}, function (err, docs) {
        if (err){
            console.log(err);
        }
        if(!docs){
            console.log('No student found with that email and password');
            res.send('Invalid credentialas');
        }
        else{
            console.log("Here are the student etails : ", docs);
            
            res.send(docs.email, docs.userType);
         
        }
    }) 
  
})


//send student marks 
router.post('/getMarks', async(req,res) => {
    console.log(req.body.email);
    const student = await Student.findOne({email: req.body.email});
    console.log(student.subjects);
    res.send(student.subjects);
})


//save marks to database
router.post('/subjectdetails', async (req, res) =>{
    console.log('student subject marks route');
    console.log(req.body);

    const student = await Student.findOne({email: req.body.email});
    
    
      Student.findOneAndUpdate({email: req.body.email}, { subjects: [...student.subjects,...req.body.subjects] }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send('subject marks successfully entered');
        }
      });
   
    console.log(res);
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

    


module.exports = router;