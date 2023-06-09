const userBlogModel = require("../model/blogModel")

exports.adminBlog=async(req,res)=>{
try {
    
    const blogs= await userBlogModel.find()
  
    if(blogs)
    {
      
        return res.status(201).send({
            message:'successed',
            blogs
        })
      
    }
    return res.status(400).send({
        message:'failed to get blog',
        blogs
    })

} catch (error) {
    console.log(error)
    
}
}