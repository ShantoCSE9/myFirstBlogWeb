const mongoose=require('mongoose');

const userBlogCoverSchema= new mongoose.Schema({
    
    coverPic:{
       type:String,
       required:true
    },

    date: {
        type: Date,
        default: Date.now
    }

})

const blogCoverModel = mongoose.model("coverPic", userBlogCoverSchema);

module.exports =blogCoverModel;