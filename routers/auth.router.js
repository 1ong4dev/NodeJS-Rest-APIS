const express = require('express');
const authController = require('../controllers/auth.controller');
// const { register, login, profile, logout} = require('../controllers/auth.controller'); // Assuming authController is defined in this file
// const multer = require('multer');
const {checkAuthToken} = require('../middlewares/auth.middleware'); // Importing the authentication middleware
// const upload = multer();

 
const router = express.Router();
//register API
router.post("/register", authController.register);
// router.post("/register", register);
//Login API
router.post("/login", authController.login);
// router.post("/login", login);
//Profile API
router.get("/profile", checkAuthToken, authController.profile);
// router.get("/profile", profile);
//Logout API
router.get("/logout", authController.logout);
// router.get("/logout", logout);
module.exports = router;