const express=require("express")
require("dotenv").config()

const app=express();


app.get("/",(req,res)=>{
    res.send({"msg":"base API"})
})

app.get("/second",(req,res)=>{
    res.send({"msg":"second api"})
})

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})