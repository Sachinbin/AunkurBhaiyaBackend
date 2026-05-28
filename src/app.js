// Express package ko import kar rahe hain
let express = require('express');
const connectDB = require('./config/db');
const TaskModel = require('./model/task.model');


//mongoose connection ko call kar rhe hai
connectDB()

// Express application ka instance create kar rahe hain
let app = express()
app.use(express.json())



/*
========================================
API Route: Create New Note / Task
Method: POST
Endpoint: /api/notes

Ye API user se title aur description leti hai,
validation check karti hai aur database me
new task create karti hai.
========================================
*/

app.post("/api/notes", async (req,res)=>{

    let {title,description} = req.body

    // Check karega ki koi field empty to nahi hai
    if(!title || !description){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    // Title minimum 3 characters ka hona chahiye
    if(title.trim().length < 3){
         return res.status(400).json({
            message:"Title must be at least 3 characters"
        })
    }

    // Description minimum 10 characters ki honi chahiye
    if(description.trim().length < 10){
         return res.status(400).json({
            message:"Description must be at least 10 characters"
        })
    }

    // Database me new task create kar rahe hain
    let newTask = await TaskModel.create({
        title,
        description,
    })

    // Successful creation response
    return res.status(201).json({
        message:"Task created successfully",
        newTask
    })
})
// app ko export kar rahe hain taki dusri files me use kar sake
module.exports = app;