const allBlogsModel = require('../model/allBlogModel');
const blogCoverModel =require('../model/blogCoverModel')
const userBlogModel=require('../model/blogModel')
const path=require('path');
const pendingBlogModel = require('../model/pendingBlog');
const draftModel = require('../model/draftModel');
exports.allBlogs=async(req,res)=>{
    try {       
         const page=req.query.page? parseInt(req.query.page):1;
         const size=req.query.size? parseInt(req.query.size):10;
         const skip=(page-1)*size
         const blog=await allBlogsModel.find().skip(skip).limit(size).sort({"_id": -1}).populate('user');
         const total =await allBlogsModel.countDocuments();
         if(blog){
            return res.status(201).send({
                message:'successed',
                blog,
                total
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

exports.adminUpdateBlog=async(req,res)=>{
    try {
        
        const {title,category,user,coverImg,blog}=req.body;
        if(!title && !category && !blog && !user &&!coverImg){
        return res.status(201).send({
             result:"did not find any cover photo",
             message:"please write again"
         })}
 
         else{
                 const newBlog=userBlogModel({title,category,user,coverImg,blog})
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


exports.pendingBlogs=async(req,res)=>{
    try {       
        const pendingblog=await pendingBlogModel.find().populate('user');
        if(pendingblog){
            return res.status(201).send({
                message:'successed',
                pendingblog
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
                 const newBlog=pendingBlogModel({title,category,blog,user,coverImg})
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

       
        const page=req.query.page? parseInt(req.query.page):1;
        const size=req.query.size? parseInt(req.query.size):10;
        const skip=(page-1)*size
        const blog=await allBlogsModel.find({category:catValue}).skip(skip).limit(size).sort({"_id": -1}).populate('user');
        const total =await allBlogsModel.countDocuments({category:catValue});
        if( blog)
        return res.status(201).send({
            message:'successed',
            blog,
            total
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
        
        const {title,category,user,coverImg,blogId,desc}=req.body;
        if(!title && !category && !blogId && !desc &&  !user &&!coverImg){
        return res.status(201).send({
             result:"did not find any cover photo",
             message:"please write again"
         })}
 
         else{
                 const newBlog=allBlogsModel({title,category,user,coverImg,desc, blogId})
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

 exports.draftBlogs=async(req,res)=>{
    try {
        
        const {title,category,user,coverImg,blogId}=req.body;
        if(!title && !category && !blogId && !user &&!coverImg){
        return res.status(201).send({
             result:"did not find any cover photo",
             message:"please write again"
         })}
 
         else{
                 const newBlog=draftModel({title,category,user,coverImg,blogId})
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
        const page=req.query.page? parseInt(req.query.page):1;
        const size=req.query.size? parseInt(req.query.size):10;
        const skip=(page-1)*size
        const blog= await allBlogsModel.find({user:id}).skip(skip).limit(size).sort({"_id": -1}).populate('user')
        const total =await allBlogsModel.countDocuments({user:id});
        if( blog)
        return res.status(201).send({
            message:'successed',
            blog,
            total
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

exports.userPendingBlog=async(req,res)=>{
    try {
      
        const {id}=req.params;
        const page=req.query.page? parseInt(req.query.page):1;
        const size=req.query.size? parseInt(req.query.size):10;
        const skip=(page-1)*size
        const blog= await draftModel.find({user:id}).skip(skip).limit(size).sort({"_id": -1}).populate('user')
        const total =await draftModel.countDocuments({user:id});
        if( blog)
        return res.status(201).send({
            message:'successed',
            blog,
            total
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
exports.updateBlog=async(req,res)=>{
    try {
      
        const {id}=req.params;
        const blog= await pendingBlogModel.find({ _id:id}).populate('user')
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
exports.UpdateBlog=async(req,res)=>{
    try {
      
        const {id}=req.params;
        const {title,category,blog,user,coverImg}=req.body;
        const updatBlog= await pendingBlogModel.findByIdAndUpdate(id, {...req.body},{new:true})
        const draftBlog= await draftModel.findOneAndUpdate({blogId:id, ...req.body, new:true})
      
        if( updatBlog &&draftBlog)
        return res.status(201).send({
            message:'successed',
            updatBlog,
            draftBlog
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