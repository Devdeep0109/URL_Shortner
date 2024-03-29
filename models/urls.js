const mongoose = require("mongoose");

// User Schema..
const urlSchema = new mongoose.Schema(
    {
        shortId:{
            type:String,
            required:true,
            unique:true,
        },
        redirectUrl:{
            type:String,
            required:true,
        },
        visitHistory:[ {timeStamp:{type:Number}} ],
    },
    { timeStamps : true }
);
// Model .........
const URL = mongoose.model('url' ,urlSchema);

module.exports = URL;