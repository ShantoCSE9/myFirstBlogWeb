const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const emailValidator = require('deep-email-validator');
exports.register=async(req, res)=>{
try {
  const {username,email,password,profileImg}=req.body;
  async function isEmailValid(email) {
    return emailValidator.validate(email)
   }

   const {valid, reason, validators} = await isEmailValid(email);
   if(!valid)
   {
     return res.status(201).send({
       result:"invalid emial",
       message:"please provide valid email"
   })
  }
    
       if(!username||!email||!password||!profileImg){
       return res.status(201).send({
            result:"registration error",
            message:"please fill all the fields"
        })
       }
     
       const existingEmail= await userModel.findOne({email});
       const existingName= await userModel.findOne({username});
       if(existingEmail || existingName ){
       return  res.status(201).send({
            result:"registration error",
            message:"email is already exisiting",
            existingName ,
            existingEmail
        })
       }


        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser= userModel({username,email, password: hashedPassword, profileImg});
        await newUser.save();
        return res.status(200).send({
            message: 'successed',
            newUser
}) 
} catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
 }
}


exports.login=  async (req,res)=>{
   try {
          const {email,password}=req.body;
          if(!email||!password){
            return res.status(201).send({
                 result:"login error",
                 message:"user is not available"
             })
            }
            const user= await userModel.findOne({email});
          
            if (!user) {
                return res.status(201).send({
                  success: false,
                  message: "email is not registerd",
                });
              }
              
            const isMatch= await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(201).send({
                    result:"failed",
                    message:"incorrect password"
                })
            }
           
            return res.status(200).send({
                result:"successed",
                message:"login successsfully",
                user
            })
           

   } catch (error) {

    console.log(error)
    return res.status(500).send({
        result:'failed',
        message:'login failed'
    })
    
   }
}
