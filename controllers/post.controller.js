const {PostSchemaValidation} = require('../validation/post.validation');   
const httpStatus = require('http-status-codes');
const Post = require("../models/post.model");


const addPost = async (req, res) =>{
  try {
    const bodyData = req.body; // Assuming bodyData is parsed from the request body
    

    const {error} = PostSchemaValidation.validate(bodyData);
    if(error){
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.details[0]?.message // Return the first validation error message
        });
    }
    // console.log("req.file:", req.file);
    const bannerImage = req.file ? req.file.filename: null; // Assuming you're using multer for file uploads
    // console.log("bannerImage:", bannerImage);
    // console.log(req.user); return false;
    // console.log("Data before save:", {
    //     ...bodyData,
    //     userId: req.user.id,
    //     bannerImage,
    //   });
    const postObject = new Post({
        ...bodyData,
        userId: req.user.id,
        bannerImage
    });
    await  postObject.save();

    return res.status(httpStatus.StatusCodes.CREATED).json({
        status: true,
        message: 'Post successfully created',
    });

  } catch (error) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: error
    }); 
  }
}
const listPost =  async (req, res) =>{
    try {
        const userPorts = await Post.find({
            userId: req.user.id // Assuming req.user contains the authenticated user's information
        });
        if(userPorts.length > 0){
            return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message: 'Posts found for this user',
                data: userPorts
            })
        }
        return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
            status: false,
            message: 'No posts found for this user'
        });

    } catch (error) {
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
    
}
const updatePost = async (req, res) =>{
    try {
        const postId = req.params.id; // Assuming you're passing the post ID in the URL
    
        const postData = await Post.findOne({
            _id: postId,
            userId: req.user.id // Ensure the post belongs to the authenticated user
        });
    if(postData){
        const {title, content, status} = req.body;
        postData.title = title || postData.title;
        postData.content = content || postData.content;
        postData.status = status || postData.status;
        if(req.file){
            postData.bannerImage = req.file.filename;
        }
        await postData.save();
        return res.status(httpStatus.StatusCodes.OK).json({
            status: true,
            message: 'Post updated successfully',
            data: postData  
        });
    }
    return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
        status: false,
        message: 'Post not found or does not belong to the user'
    });

        
     } catch (error) {
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
     }
}
const deletePost = async (req, res) =>{
try {
    
const postId = req.params.id;

const postData = await Post.findOneAndDelete({
    _id: postId,
    userId: req.user.id // Ensure the post belongs to the authenticated user
})
if(!postData){
return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
    status: false,
    message: 'Post not found or does not belong to the user'
})
}
return res.status(httpStatus.StatusCodes.OK).json({
    status: true,
    message: 'Post deleted successfully',
});

} catch (error) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: false,
        message: error
    });
}
}

const singlePost = async (req, res) =>{

    try {
        const idPost = req.params.id; // Assuming you're passing the post ID in the URL
        const dataPosts = await Post.findOne({
            _id: idPost,
            userId: req.user.id//
        });
        if(dataPosts){
            return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message: 'Post found successfully', 
                data: dataPosts 
            })
        }
        return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
            status: false,
            message: "Post not found or does not belong to the user"
        });
    } catch (error) {
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message:error
        });
    }
}
module.exports = {
    addPost,
    listPost,
    updatePost,
    deletePost,
    singlePost
}