const mongoose = require("mongoose")

// const connection = mongoose.connect("mongodb://127.0.0.1:27017/evaluation")
const connection = mongoose.connect("mongodb+srv://evaluation:Arbaz2212@cluster0.tl2qnlr.mongodb.net/?retryWrites=true&w=majority")
module.exports = {connection}