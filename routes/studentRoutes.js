const express = require('express');
const Student = require('../models/student.js');
const router = express.Router();


//signup
router.post('/signup', async (req, res) => {
    console.log('student signup route');
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
  
    const result = await student.save();
    console.log(result);
}
catch(err) {
    console.log(err.message);
    res.send("There was some error in signup: ",err.message);
}
    

})


//login
router.post('/login', async (req, res) => {
    console.log('student login route');
    console.log("Email:",req.body.email);
    console.log("pass:",req.body.password);
    try{
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
          
            res.send(docs);
         
        }
    })
}
catch(err){
    console.log("There was an error",err.message);
    res.send(err.message);
} 
  
})


//send student marks 
router.post('/getMarks', async(req,res) => {
    console.log(req.body.email);
    try{
    const student = await Student.findOne({email: req.body.email});
    console.log(student.subjects);
    res.send(student.subjects);
    }
    catch(err){
        console.log(err.message);
        res.send("there was some error",err.message);
    }
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

    


module.exports = router;