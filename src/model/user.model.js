// mongoose package ko import kar rahe hain
const { default: mongoose } = require("mongoose");


// User schema create kar rahe hain
let userSchema = new mongoose.Schema({

    // User ka email field
    email:{
        type:String,          
        unique:true,         
        required:true,        
        lowercase:true        
    },

    // User ka password field
    password:{
        type:String,          
        required:true       
    }

},{
    // Automatically createdAt aur updatedAt fields add karega
    timestamps:true
})

// "users" collection ke liye model create kar rahe hain
let UserModel = mongoose.model("users",userSchema)

// Model ko export kar rahe hain taki dusri files me use kar sake
module.exports = UserModel