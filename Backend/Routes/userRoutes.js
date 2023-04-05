const express = require("express");
const {registerUser,authUser,allUsers}=require("../controllers/userControllers")
const userRouter = express.Router();
userRouter.route("/").get(allUsers)
userRouter.route("/").post(registerUser)
 // userRouter.post('/login',authUser)
userRouter.route('/login').post(authUser)

module.exports={userRouter}
