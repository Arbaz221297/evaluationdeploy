const express = require("express");

const {Blogmodel} = require("../models/Blog.model")
const {Usermodel} = require("../models/User.model")
const blogRouter = express.Router();

blogRouter.get("/", async(req, res) => {
    const blogs = await Blogmodel.find()
    res.send(blogs)
})

blogRouter.post("/create", async(req, res) => {
    const {title, description, category} = req.body
    const author_id = req.userID
    const blog = new Blogmodel({
        title,
        description,
        category,
        author_id
    })
    await blog.save()
    res.status(201).send({"msg" : "Blog created successfully"})
})


blogRouter.delete("/delete/:blogID", async(req, res) => {
    const {blogID} = req.params
    const userID = req.userID //current user who is making this request, their ID
    const blog = await Blogmodel.findOne({_id : blogID})
    const author_id = blog.author_id // the user who wrote Blog, their ID

    if(author_id === userID){
        await Blogmodel.findOneAndDelete({_id : blogID})
        res.send({"msg" : "Blog deleted successfully"})
    }
    else{
        res.send({"msg" : "You are not authorised to do this"})
    }
})

module.exports = {blogRouter}