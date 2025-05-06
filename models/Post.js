const mongoose = require('mongoose');

const PostCchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        max:200,
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[],
    },
}, {timestamps:true});


module.exports = mongoose.model("Post", PostCchema);