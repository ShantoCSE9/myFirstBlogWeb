const mongoose=require('mongoose');

const allBlogsSchema= new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    coverImg:{
        type: String,
        required:true
    },
    blogId:{
        type: String,
        required:true
    },
    user:{
       type: mongoose.Types.ObjectId,
       ref:'User',
       required:true
    },
    date: {
        type: Date,
        default: new Date()
    }

})

const allBlogsModel = mongoose.model("Blogs", allBlogsSchema);

module.exports =allBlogsModel;