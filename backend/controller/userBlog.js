const allBlogsModel = require('../model/allBlogModel');
const blogCoverModel =require('../model/blogCoverModel')
const userBlogModel=require('../model/blogModel')
const path=require('path');
exports.allBlogs=async(req,res)=>{
    try {       
        const blog=await allBlogsModel.find().populate('user');
        if(blog){
            return res.status(201).send({
                message:'successed',
               blog
            })
        }  
        else{
            return res.status(201).send({
                message:'failed'
            })
        }

    } catch (error) {
        console.log(error);
    }
}


exports.uploadPhoto=async(req,res)=>{
    try {
        const {filename}=req.file;
        if(!path){
         return res.status(201).send({
             result:"did not find any cover photo",
             message:"please write again"   
         })}

         else{
              const blogCover=blogCoverModel({coverPic:filename})
              await blogCover.save()
              return res.status(201).send({
                 message:"successefully uploaded photo",
                 blogCover 
              })
              
         }      
     
    } catch (error) {
       console.log(error)
       return res.status(500).send({
         message:"something is wrong",
         
     })
    }

 }
 

exports.createBlog=async(req,res)=>{
    try {
        
        const {title,category,blog,user,coverImg}=req.body;
        if(!title && !category && !blog &&!user &&!coverImg){
        return res.status(201).send({
             result:"did not find any cover photo",
             message:"please write again"
         })}
 
         else{
                 const newBlog=userBlogModel({title,category,blog,user,coverImg})
                 await newBlog.save()
                 return res.status(201).send({
                   message:"blog successfully created",
                    newBlog
                 })
         }
        
     
    } catch (error) {
       console.log(error)
       return res.status(500).send({
         message:"something is wrong",
         
     })
    }
 
 }

 exports.singleBlog=async(req,res)=>{
    try {
        const {id}=req.params;
        const singleBlog= await userBlogModel.findById(id).populate('user')
        if(singleBlog)
        return res.status(201).send({
            message:'successed',
            singleBlog
        })
        else res.status(404).send({
            message:'failed to get blog',
            singleBlog
        })
    } catch (error) {
        console.log(error);  
        res.status(500).send({
            message:'server error',
            singleBlog
        }) 
    }
 }



exports.categoryBlog=async(req,res)=>{
    try {
        let catValue;
        const {category}=req.params;
        if(category==='history')
        catValue='ইতিহাস'
        if(category==='book_and_cinema')
        catValue='বই ও সিনেমা'
        if(category==='sports')
        catValue='খেলা'
        if(category==='science')
        catValue='বিজ্ঞান'
        if(category==='bd')
        catValue='বাংলাদেশ'
        if(category==='world')
        catValue='বিশ্ব'

       
        const blog= await allBlogsModel.find({category:catValue}).populate('user')
       
        if( blog)
        return res.status(201).send({
            message:'successed',
            blog
        })
        // else res.status(404).send({
        //     message:'failed to get blog',
        //     singleBlog
        // })
    } catch (error) {
        console.log(error);  
        res.status(500).send({
            message:'server error',
    
        }) 
    }
}

exports.homeBlogs=async(req,res)=>{
    try {
        
        const {title,category,user,coverImg,blogId}=req.body;
        if(!title && !category && !blogId && !user &&!coverImg){
        return res.status(201).send({
             result:"did not find any cover photo",
             message:"please write again"
         })}
 
         else{
                 const newBlog=allBlogsModel({title,category,user,coverImg,blogId})
                 await newBlog.save()
                 return res.status(201).send({
                    message:"home blogs successfully created",
                    newBlog
                 })
         }
        
     
    } catch (error) {
       console.log(error)
       return res.status(500).send({
         message:"something is wrong",
         
     })
}
 
 }

 exports.userBlog=async(req,res)=>{
    try {
      
        const {id}=req.params;
        
        const blog= await allBlogsModel.find({user:id}).populate('user')
        if( blog)
        return res.status(201).send({
            message:'successed',
            blog
        })
        else res.status(404).send({
            message:'failed to get blog',
        })

    } catch (error) {
        console.log(error);  
        res.status(500).send({
            message:'server error',
    
        }) 
    }
}
exports.updateBlog=()=>{}
exports.deleteBlog=()=>{}