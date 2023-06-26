const express = require("express")
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
require("dotenv").config()

const {connection} = require("./config/db")
const {Usermodel} = require("./models/User.model")
const {blogRouter} = require("./routes/blog.routes")
const {authenticate} = require("./middlewares/authenticate")

const app = express()

app.use(express.json())

app.post("/signup", async (req, res) => {
    const {email, password, name, age} = req.body
    const hashed_password = bcrypt.hashSync(password, 8);
    const new_user = new Usermodel({
        email,
        password : hashed_password,
        name,
        age,
    })
    await new_user.save()
    res.send("signup successfull")
})

app.post("/login", async (req, res) => {
    const {email, password} = req.body
    const user = await Usermodel.findOne({email})
    console.log(user)
    if(!user){
        res.send("Please sign up")
    }
    const hash = user.password
    const correct_password = bcrypt.compareSync(password, hash);
    if(correct_password){
        const token = jwt.sign({ userID : user._id }, 
            process.env.JWT_SECRET);
        res.send({"msg" : "login successfull", "token" : token})
    }
    else{
        res.send("login failed")
    }
})

app.use("/blogs", authenticate,  blogRouter)


app.listen(process.env.PORT, async () => {
    try{
        await connection
        console.log(`listening on port ${process.env.PORT}`)
    }
    catch(err){
        console.log("error while connecting to DB")
        console.log(err)
    }
    console.log(`listening on port ${process.env.PORT}`)
})



