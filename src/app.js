// Express package ko import kar rahe hain
let express = require('express');
const connectDB = require('./config/db');
const TaskModel = require('./model/task.model');
const cookieParser = require('cookie-parser');
const UserModel = require('./model/user.model');
const jwt = require("jsonwebtoken")


//mongoose connection ko call kar rhe hai
connectDB()

// Express application ka instance create kar rahe hain
let app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())



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

app.post("/api/notes", async (req, res) => {

    let { title, description } = req.body
    let {email} = req.user.email

    // Check karega ki koi field empty to nahi hai
    if (!title || !description) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Title minimum 3 characters ka hona chahiye
    if (title.trim().length < 3) {
        return res.status(400).json({
            message: "Title must be at least 3 characters"
        })
    }

    // Description minimum 10 characters ki honi chahiye
    if (description.trim().length < 10) {
        return res.status(400).json({
            message: "Description must be at least 10 characters"
        })
    }

    // Database me new task create kar rahe hain
    let newTask = await TaskModel.create({
        title,
        description,
        userMail:email
    })

    // Successful creation response
    return res.status(201).json({
        message: "Task created successfully",
        newTask
    })
})

/*
========================================
API Route: Get User Notes
Method: GET
Endpoint: /api/notes

Ye API logged in user ke email ke basis par
database se uske notes fetch karti hai.
========================================
*/

app.get("/api/notes", async (req, res) => {

    // Logged in user ka email le rahe hain
    let email = req.user.email

    // User ke sare notes database se fetch kar rahe hain
    let notes = await TaskModel.find({ email })

    // Successful response
    return res.status(200).json({
        message: "Notes fetched successfully",
        notes
    })
})


/*
========================================
API Route: Update Note / Task
Method: POST
Endpoint: /api/notes/update/:id

Ye API note ka id lekar existing task ko
update karti hai.
========================================
*/
app.put("/api/notes/update/:id", async (req, res) => {

    // URL params se task ki id le rahe hain
    let { id } = req.params

    // Request body se updated data le rahe hain
    let { title, description } = req.body

    // Check karega ki MongoDB ObjectId valid hai ya nahi
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID"
        })
    }

    // Check karega ki koi field empty to nahi hai
    if (!title || !description) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    // Title minimum 3 characters ka hona chahiye
    if (title.trim().length < 3) {
        return res.status(400).json({
            message: "Title must be at least 3 characters"
        })
    }

    // Description minimum 10 characters ki honi chahiye
    if (description.trim().length < 10) {
        return res.status(400).json({
            message: "Description must be at least 10 characters"
        })
    }

    // Database me existing task update kar rahe hain
    let updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        {
            title,
            description,
        },
        {
            new: true
        }
    )

    // Check karega ki task database me mila ya nahi
    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    // Successful response
    return res.status(200).json({
        message: "Task updated successfully",
        updatedTask
    })
})


/*
========================================
API Route: Delete Note / Task
Method: DELETE
Endpoint: /api/notes/delete/:id

Ye API task ki id lekar database se
note delete karti hai.
========================================
*/

app.delete("/api/notes/delete/:id", async (req, res) => {

    // URL params se task ki id le rahe hain
    let { id } = req.params

    // Check karega ki MongoDB ObjectId valid hai ya nahi
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID"
        })
    }

    // Database se task delete kar rahe hain
    let deletedTask = await TaskModel.findByIdAndDelete(id)

    // Check karega ki task database me mila ya nahi
    if (!deletedTask) {
        return res.status(404).json({
            message: "Task not found"
        })
    }

    // Successful response
    return res.status(200).json({
        message: "Task deleted successfully",
        deletedTask
    })
})

/*
========================================
API Route: Register User
Method: POST
Endpoint: /api/auth/register

Ye API new user ko register karti hai,
JWT token generate karti hai aur cookie me save karti hai.
========================================
*/

app.post('/api/auth/register', async (req, res) => {

    // Request body se email aur password le rahe hain
    let { email, password } = req.body;

    // Check karega ki koi field empty to nahi hai
    if (!email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        })
    }

    // Check karega ki user already exist karta hai ya nahi
    let user = await UserModel.findOne({ email })

    if (user) {
        return res.status(409).json({
            message: 'User already exists'
        })
    }

    // Database me new user create kar rahe hain
    let newUser = await UserModel.create({
        email,
        password,
    })

    // JWT token generate kar rahe hain
    let token = jwt.sign(
        { id: newUser._id },
        process.env.TOKEN_SECRET,
    )

    // Token ko cookie me save kar rahe hain
    res.cookie("token", token)

    // Successful response
    return res.status(201).json({
        message: 'User created successfully',
        newUser
    })
})
// app ko export kar rahe hain taki dusri files me use kar sake
module.exports = app;