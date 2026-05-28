// mongoose package ko import kar rahe hain
const { default: mongoose } = require("mongoose");

// Task ka schema create kar rahe hain
let taskSchema = new mongoose.Schema({

    // Task ka title store hoga
    title: String,

    // Task ka description store hoga
    description: String,
})

// "tasks" collection ke liye model create kar rahe hain
let TaskModel = mongoose.model("tasks", taskSchema);

// Model ko export kar rahe hain taki dusri files me use kar sake
module.exports = TaskModel