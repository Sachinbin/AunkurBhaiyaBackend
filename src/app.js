// Express package ko import kar rahe hain
let express = require('express');
const connectDB = require('./config/db');


//mongoose connection ko call kar rhe hai
connectDB()

// Express application ka instance create kar rahe hain
let app = express()

// app ko export kar rahe hain taki dusri files me use kar sake
module.exports = app;