const express = require('express')
const cors = require('cors') //connect frontend and the backend
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080

//next create the schema
const schemaData= mongoose.Schema({
  name:String,
  email:String,
  mobile:Number
},{
  timeStamps:true
})

//create the model
const userModel= mongoose.model("user",schemaData) //users is the collection

//API section

//get method is use for read
//http://localhost:8080/
app.get("/",async(req,res)=>{
  const data= await userModel.find({})
  res.json({success:true,data:data})
})

//create data and save data in mongodb
//http://localhost:8080/create
/*
{
  name,
  email,
  mobile
}*/
app.post("/create",async(req,res)=>{
  console.log(req.body)
  const data= new userModel(req.body)
  await data.save()
  res.send({success:true,message:"Data save Successfully",data:data})
})

//update data method
//http://localhost:8080/update
/*
{
  id:" "
  name:" ",
  email:" ",
  mobile:" "
}*/
app.put("/update",async(req,res)=>{
  console.log(req.body)
  const {id,...rest}=req.body
  console.log(rest)
  const data= await userModel.updateOne({_id:id},rest)
  res.send({success:true,message:"Data updated Successfully",data:data})
})

//delete method
//http://localhost:8080/delete
app.delete("/delete",async(req,res)=>{
const id=req.params.id
console.log(id)
const data= await userModel.deleteOne({_id:id})
res.send({success:true,message:"Data deleted Successfully",data:data})

})

//connect the database
mongoose.connect("mongodb://localhost:27017/crudoperation")
.then(()=>{
  console.log("connect to database")
  app.listen(PORT,()=>console.log("server is running"))
})
.catch((err)=>console.log(err))

//here after the database is creating server is running.





