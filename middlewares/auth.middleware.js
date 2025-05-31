const JWT = require('jsonwebtoken');
require('dotenv').config();
const httpStatus = require('http-status-codes');
const Blacklist = require('../models/blacklist.model'); // Assuming you have a blacklist model for token management




const checkAuthToken = async (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1];

    try {

        const isValidToken = await Blacklist.findOne({
            token
        });

        if(isValidToken) {
            return res.json({
                status: false,
                message: "Invalid token"
            });
        }
        const decodedUserData = JWT.verify(token, process.env.JWT_SECRET);  
        req.user = decodedUserData; // Attach the decoded user data to the request object
        
        next(); // Call the next middleware or route handler
    } catch (error) {
        return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
            status: false,
            message: "Access denied"
        });
    }
}
const sessionCheckAuth = async(req,res,next) => {
    if(req.session.user){
        next();
    }
    else{
        return res.json({
            status: false,
            message:"Access denied, please login first"
        })
    }
}

module.exports = {
    checkAuthToken,
    sessionCheckAuth
}