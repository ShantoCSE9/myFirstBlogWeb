const express= require('express');
const cors=require('cors')
const dotenv= require('dotenv');
const connectDB = require('./config/db');
const userRouter  = require('./routes/route'); 
const bodyParser=require('body-parser');
const morgan=require('morgan');
const multiParty=require('connect-multiparty');
const Midlware= multiParty({uploadDir:'./Images'})
dotenv.config();
const app=express();
connectDB();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: false}));





app.use('/api/v1/blog-site',userRouter)

app.post('/upload',Midlware,(req,res)=>{
  console.log(req.files.upload)
})
const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{
   
        console.log(`server running successfully at ${PORT}`);
})

