const mongoose = require("mongoose")

const userSchema  = mongoose.Schema({
    email : String,
    password : String,
    name : String,
    IP_Address:String
})

const Usermodel = mongoose.model("user", userSchema)

module.exports = {Usermodel}