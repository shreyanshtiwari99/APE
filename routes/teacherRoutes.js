const express = require('express');
const Teacher = require('../models/teacher.js');
const router = express.Router();

router.post('/signup', async (req, res) => {
    console.log('teacher post route');
    const teacher = new Teacher({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        phoneno:req.body.phoneno,
        isHod:req.body.isHod
    })
    try{
    const result = await teacher.save();
    console.log(result);
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
        if(!docs)
            console.log('No teacher found with that email and password')
        else{
            console.log("Here are the teacher etails : ", docs);
            res.send(docs);
        }
    }) 
})




module.exports = router;