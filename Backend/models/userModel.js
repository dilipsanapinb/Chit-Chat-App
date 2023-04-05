const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    pass: {
        type: String,
        required:true
    },
    pic: {
        type: String,
        required: true,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
},
    {
    timestamp:true
})

const User=mongoose.model("user",userSchema)