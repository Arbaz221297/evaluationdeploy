const mongoose = require("mongoose")


const employeeSchema  = mongoose.Schema({
   firstName:String,
   lastName:String,
   email:String,
   department:String,
   salary:String

})

const Employeemodel = mongoose.model("employee", employeeSchema)

module.exports = {Employeemodel}