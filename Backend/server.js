const express=require("express");
const {chats}=require("./data/data")
const app=express();
require('dotenv').config();
const {ConnectToDB}=require("./config/db")
const port = process.env.PORT || 5000;
const colors = require("colors");
const { userRouter } = require("./Routes/userRoutes");
const {chatRouter}=require('./Routes/chatRouter')
const {notFound,errorHandler}=require("./middleWares/errorMiddleware")
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To Chit-Chat-App")
})
// users api
app.use("/api/user", userRouter);
// chat api
app.use("/api/chat",chatRouter)

// error handling
app.use(notFound);
app.use(errorHandler)




app.listen(port,()=>{
    console.log(`server is running on port ${port}`.yellow.bold);
    ConnectToDB()
})
