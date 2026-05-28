// app file ko import kar rahe hain
let app = require('./src/app')

// Server ko port 3000 par start kar rahe hain
app.listen(3000,()=>{

    // Console me message show hoga jab server successfully start ho jayega
    console.log('server listening port 3000');
    
})