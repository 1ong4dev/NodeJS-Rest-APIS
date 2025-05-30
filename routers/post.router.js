const express = require('express');
const postController = require('../controllers/post.controller');
const {checkAuthToken} = require('../middlewares/auth.middleware'); // Importing the authentication middleware
const router = express.Router();
const upload = require('../middlewares/upload.middleware'); // Importing the upload middleware



router.post('/addPost', checkAuthToken, upload.single("bannerImage") ,postController.addPost);

//

router.get('/listPost',checkAuthToken ,postController.listPost);

//

router.put('/updatePost/:id', checkAuthToken, upload.single("bannerImage") ,postController.updatePost);

//
router.delete('/deletePost/:id', checkAuthToken, postController.deletePost);

//
router.get('/singlePost/:id', checkAuthToken, postController.singlePost);


module.exports = router;