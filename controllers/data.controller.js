const User = require('../models/user.model');   
const express = require('express');
const router = express.Router();  
const Post = require('../models/post.model'); // Importing the Post model   
// user wise posts
router.get('/userPosts', async(req,res)=>{
    try {
        const postsData = await User.aggregate([{
            $lookup:{
                from:'posts',
                localField: '_id',
                foreignField: 'userId',
                as: 'postData'
            }
        }]);
        return res.json({
            status: true,
            message: 'Posts found for this user',
            data: postsData
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error
        });
    }
})

// get Male  users  
router.get('/maleUsers', async(req, res)=>{
    const users = await User.find({
        gender:"male"
    });
    if(users.length > 0){
        return res.json({
            status: true,
            message: "List Male users found successfully",
            data: users 
        });
    }
    else{
        return res.json({
            status: false,  
            message: "Male users not found"
        });
    }

})

router.get('/famaleUsers', async(req, res) =>{
    const users = await User.find({
        gender: "famale"
    })
    if(users.length > 0){
        return res.json({
            status: true,
            message: "List Famale users found successfully",
            data: users
        })
    }
    else{
        return res.json({
            status: false,
            message: "Famale users not found"
        })
    }
})

//get email 
router.get('/emailUsers', async(req, res)=>{
    const users = await User.find({
        email:{
            $regex: /@gmail.com$/,
        }
    });
    return res.json({
        status: true,
        message: "List of users with gmail email found successfully",
        data: users
    })
})
//
router.get('/postwithUsers', async(req, res)=>{
    const posts = await Post.find({}).populate('userId');

    return res.json({
        status: true,
        message: "List of posts with user details found successfully",
        data: posts
    })
})



module.exports = router;