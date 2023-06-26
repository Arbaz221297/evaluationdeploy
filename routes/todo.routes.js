const express = require("express");

const {Todomodel} = require("../models/Todo.model")
const {Usermodel} = require("../models/User.model")
const todoRouter = express.Router();

todoRouter.get("/", async(req, res) => {
    const todos = await Todomodel.find()
    res.send(todos)

    // try {
    //     const userId = req.userId;
    //     const { status } = req.query;    
    //     let todos;    
    //     if (status) {
    //       todos = await Todo.find({ user: userId, status });
    //     } else {
    //       todos = await Todo.find({ user: userId });
    //     }
    
    //     res.json(todos);
    //   } catch (error) {
    //     res.status(500).json({ message: 'An error occurred' });
    //   }
    



})

todoRouter.get('/', async (req, res) => {
    try {
     const { status,tag } = req.query;  

      let  todos = await Todomodel.find();
      if(status){
        todos=todo.filter((ele)=>
            ele.status==status
        )
      }
      if(tag){
        todos=todo.filter((ele)=>
            ele.todo.tag==tag
        )
      }
      
  
      res.send(todos);
    } catch (error) {
      res.send({ message: 'An error occurred' });
    }
  });


  




todoRouter.post("/create", async(req, res) => {
    const {taskname,status,tag} = req.body
    const author_id = req.userID
    const todo = new Todomodel({
        taskname,
        status,
        tag,
        author_id
    })
    await todo.save()
    res.send({"msg" : "todo created successfully"})
})


todoRouter.delete("/delete/:todoID", async(req, res) => {
    const {todoID} = req.params
    const userID = req.userID 
    const todo = await Todomodel.findOne({_id : todoID})
    const author_id = todo.author_id 

    if(author_id === userID){
        await Todomodel.findOneAndDelete({_id : todoID})
        res.send({"msg" : "todo deleted"})
    }
    else{
        res.send({"msg" : "You are not authorised"})
    }
})

module.exports = {todoRouter}



