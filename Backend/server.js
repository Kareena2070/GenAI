require("dotenv").config()
const app = require("./src/app")
const connectDB = require("./src/config/db.js")
const {resume, jobDescription, selfDescription} = require("./src/services/temp.js")
const generateInterviewReport = require("./src/services/ai.service.js")

connectDB()
generateInterviewReport({resume, jobDescription, selfDescription})


app.listen(3000, ()=>{
    console.log("server is running on 3000 port")
})