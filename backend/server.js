require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')


//express app
const app = express()
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
const cors = require("cors");
    app.use(cors());
//routes
app.use('/api/workouts',workoutRoutes)

//connect to database
mongoose.connect(process.env.MONG_URL)
.then(()=>{
    //listen for request
    app.listen(process.env.PORT,()=>{
    console.log("Connected to DB and Listening on PORT",process.env.PORT)
    })
})
.catch((error)=>{console.log(error)})


process.env