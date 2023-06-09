const mongoose=require('mongoose');

const userBlogSchema= new mongoose.Schema({
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
    blog:{
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

const userBlogModel = mongoose.model("allBlogs", userBlogSchema);

module.exports =userBlogModel;