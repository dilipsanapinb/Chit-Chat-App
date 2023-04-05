const express=require("express");
const {chats}=require("./data/data")
const app=express();
require('dotenv').config();
const port=process.env.PORT|| 5000

app.get("/",(req,res)=>{
    res.send("basic get api")
})

app.get("/api/chat",(req,res)=>{
    res.send(chats);
})
app.get("/api/chat/:id",(req,res)=>{
    let id=req.params.id;
    console.log(id)
   let data= chats.find(el=>(el._id===id));
    res.send(data);
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
