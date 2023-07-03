const express = require("express");

const {Employeemodel} = require("../models/Employee.model")
const {Usermodel} = require("../models/User.model")
const employeeRouter = express.Router();

employeeRouter.get("/", async(req, res) => {
    const employees = await Employeemodel.find()
    res.send(employees)

   


})






employeeRouter.post("/", async(req, res) => {
    const {firstName,
      lastName,
      email,
      department,
      salary} = req.body
  
    const employees = new Employeemodel({
       firstName,
       lastName,
       email,
       department,
       salary
    })
    await employees.save()
    res.send({"msg" : "employee created successfully"})
})







employeeRouter.put("/:id", async(req, res) => {
  const {id} = req.params

  const {
     firstName,
     lastName,
     email,
     department,
     salary
  }=req.body

  const updatedemployee=await Employeemodel.findByIdAndUpdate(id,
    {
      firstName,
      lastName,
      email,
      department,
      salary
   },{new:true});


   if(!updatedemployee){
    return res.send({error:"employee not found"});
   }
  
})





employeeRouter.delete("/:id", async(req, res) => {
    const {id} = req.params
    
    const deleted = await Employeemodel.findByIdAndDelete(id)
    

    if(!deleted){
      return res.send({"msg" : "employee not found"})
    }
        
       
    
        res.send({"msg" : "Employee deleted"})
    
})

module.exports = {employeeRouter}



