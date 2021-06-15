const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes')
const teacherRoutes = require('./routes/teacherRoutes');

mongoose.connect('mongodb+srv://Shreyansh:shreytheking99@cluster0.5o5ap.mongodb.net/ape?retryWrites=true&w=majority', {useUnifiedTopology:true, useNewUrlParser: true})
    .then(()=> console.log('Connected to MongoDB..'))
    .catch((e)=> console.log('There was some error in connecting to the database',e));

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//student routes
// app.use('/student',studentRoutes)

app.use('/student',studentRoutes);
app.use('/teacher',teacherRoutes);




const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Listening on port ${port}`));