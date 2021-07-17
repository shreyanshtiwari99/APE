const express = require('express');
const config = require('config');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes')
const teacherRoutes = require('./routes/teacherRoutes');
const {Student} = require('./models/student');
const {Teacher} = require('./models/teacher');
const dotenv = require('dotenv').config();


if(!config.get('jwtPrivateKey')){
  console.log('Fatal error');
  process.exit(1);
}

mongoose.connect(process.env.MongoDB_URI, {useUnifiedTopology:true, useNewUrlParser: true})
    .then(()=> console.log('Connected to MongoDB..'))
    .catch((e)=> console.log('There was some error in connecting to the database',e));
   
app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//student routes

app.get('/getStudents', async (req,res)=>{
  const students = await Student.find().select('-password').sort('firstname');

  res.send(students);
})
app.get('/getTeachers', async (req,res)=>{
  const teachers = await Teacher.find().select('-password');

  res.send(teachers);
})
app.use('/student',studentRoutes);
app.use('/teacher',teacherRoutes);




const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Listening on port ${port}`));