const express= require('express');
const { register, login} = require('../controller/userController');
const {  createBlog, updateBlog, homeBlogs, singleBlog, deleteBlog, allBlogs, uploadPhoto, categoryBlog, userBlog } = require('../controller/userBlog');
const multer  = require('multer')
const router=express.Router();

const path=require('path');
const { adminBlog } = require('../controller/adminBlog');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../frontend/public')
    },
    filename: function (req, file, cb) {
     const extent=path.extname(file.originalname)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+extent)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/register', register);

router.post('/login',login);

router.get('/',allBlogs);
 
router.post('/upload',upload.single('avatar'),uploadPhoto)

router.post('/create-blog', createBlog);

router.put('/update-blog:id',updateBlog);

router.get('/category/:category', categoryBlog)

router.post('/home-blogs',homeBlogs);

router.get('/single-blog/:id',singleBlog);
router.get('/user-blog/:id',userBlog);
router.get('/adminBlog',adminBlog)

router.delete("/delete-blog/:id", deleteBlog);

module.exports=router;