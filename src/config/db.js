// mongoose package ko import kar rahe hain
const { default: mongoose } = require("mongoose")

// Database connect karne ke liye async function bana rahe hain
let connectDB = async () => {

    try {

        // MongoDB database se connect kar rahe hain
        await mongoose.connect('mongodb://0.0.0.0/ankurBhaiya')

        // Agar database successfully connect ho jaye to message show hoga
        console.log("DB connected")

    } catch (error) {

        // Agar database connection fail ho jaye to message show hoga
       console.log("DB connection failed") 
    }
}

// Function ko export kar rahe hain taki dusri files me use kar sake
module.exports = connectDB