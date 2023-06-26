const mongoose = require("mongoose")


const todoSchema  = mongoose.Schema({
   taskname : String,
   status:{type : String, default:"pending", enum:["pending","done"]},
   tag : {type : String, default:"personal", enum:["personal","official","family"]}, 
   author_id : String
})

const Todomodel = mongoose.model("todo", todoSchema)

module.exports = {Todomodel}