const mongoose = require("mongoose")

const userSchema  = mongoose.Schema({
    email : String,
    password : String,
    age : Number,
    name : String,
})

const Usermodel = mongoose.model("user", userSchema)

module.exports = {Usermodel}