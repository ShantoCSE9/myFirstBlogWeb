const mongoose=require("mongoose");
const connectDB=async ()=>{
     try {
        await mongoose.connect(process.env.M_URL);
        console.log('mongodb is connected successfully')
        
     } catch (error) {
        console.log(error);
     }
}
module.exports=connectDB;