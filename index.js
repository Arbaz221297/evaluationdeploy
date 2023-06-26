const express = require("express")
var jwt = require('jsonwebtoken');
require("dotenv").config()
const bcrypt = require("bcrypt")
const {Usermodel} = require("./models/User.model")
const {connection} = require("./config/db")
const {todoRouter} = require("./routes/todo.routes")
const {authenticate} = require("./middlewares/authenticate")

const app = express()

app.use(express.json())

app.post("/signup", async (req, res) => {
    const {email, password, name, IP_Address} = req.body
    const hashed_password = bcrypt.hashSync(password,8);
    const new_user = new Usermodel({
        email,
        password :hashed_password,
        name,
        IP_Address        
    })
    await new_user.save()
    res.send("signup successfully")
})

app.post("/login", async (req, res) => {
    const{email, password} = req.body
    const user = await Usermodel.findOne({email})
    console.log(user)
    if(!user){
        res.send("Please signup")
    }
    const hash = user.password

    const correct_password = bcrypt.compareSync(password,hash);
    if(correct_password){
        const token = jwt.sign({ userID : user._id }, 
            process.env.JWT_SECRET);
        res.send({"msg" : "login successfull", "token" :token})
    }
    else{
        res.send("login failed")
    }
})



app.use("/todos", authenticate,  todoRouter)

app.listen(process.env.PORT, async () => {
    try{
        await connection
        console.log(`listening on port ${process.env.PORT}`)
    }
    catch(err){
        console.log("error")
        console.log(err)
    }
    
})



