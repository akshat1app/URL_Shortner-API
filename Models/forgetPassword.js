const mongoose = require("mongoose");

const forgetSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        otp:{
            type:Number,
            required:true,
        }
    }
);

const forgetUser = mongoose.model("otp",forgetSchema);

module.exports=forgetUser;