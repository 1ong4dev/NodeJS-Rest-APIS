const User = require('../models/user.model');
const httpStatus = require("http-status-codes");   
const { UserSchemaValidation } = require("../validation/user.validation");
const bcrypt = require('bcrypt');
const { generateToken} = require("../helper/auth.helper");
const Blacklist = require('../models/blacklist.model'); // Assuming you have a blacklist model for token management


/**
 * @openapi
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Auth USER APIS
 *     summary: Register USER APIs
 *     description: Register a new user
 *     operationId: postapiv1authregister
 *     parameters: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: long sieudeptrai
 *               email:
 *                 type: string
 *                 example: long@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: successfully registered user
 *                 user:
 *                   type: object
 */


const register = async (req,res) =>{
    try {
    const bodyData = req.body

// Validate the request body using Joi schema
        const { error } = UserSchemaValidation.validate(req.body); 
        if(error) {
            return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: error.details[0].message, // Return the first validation error message
        
            });
        }
// Check if the user email already exists
        const userExists = await User.findOne({
            email: bodyData.email
        })

        if(userExists){
            return res.status(httpStatus.StatusCodes.BAD_REQUEST).json({
                status: false,
                message: 'User already exists with this email address',
            });
        }
// Create a new user object and save it to the database
    const userObject = new User(bodyData);
    await userObject.save();

// Prepare the response data
   return res.status(httpStatus.StatusCodes.CREATED).json({
        status: true,
        message: 'successfully registered user',
        user : bodyData
    }); 
    } catch (error) {
       return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: 'Failed to register user',
        });
    }
}
const login = async (req,res) =>{
    try {
        const {email, password} = req.body;

        const userExists =  await User.findOne({
            email
        });
        
        if(userExists){

            const isMatch = await bcrypt.compare(password, userExists.password);
            if(!isMatch){
                return res.status(httpStatus.StatusCodes.UNAUTHORIZED).json({
                    status: false,
                    message:"Invalid email or password"
                })
            }
            const token =  generateToken(userExists);
            return res.status(httpStatus.StatusCodes.OK).json({
                status: true,
                message:"Login successfully",
                token
            });

            // req.session.user = {
            //     id: userExists._id,
            //     emailAddress: email,
            //     name: userExists.name,
            // };
            //     return res.status(httpStatus.StatusCodes.OK).json({
            //     status: true,
            //     message:"Login successfully",
               
            // });


        } else{
            return res.status(httpStatus.StatusCodes.NOT_FOUND).json({
                status: false,
                message:"User email not found"
            });
        }
        
    } catch (error) {
        return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
        
    }
 
}
const profile = (req,res) =>{
    res.json({
        status: true,
        message: 'This is profile user api',
       user: req.user
        // user: req.session.user
    })
}
const logout = async (req,res) =>{
   const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
   if(token){
    await Blacklist.create({ 
        token,
        expireAt: new Date(req.user.exp * 1000) // Assuming req.user.exp is in seconds and you want to convert it to milliseconds
     }); // Add token to blacklist
   }

    // await req.session.destroy();
   res.status(httpStatus.StatusCodes.OK).json({
        status: true,
        message: 'Logout successfully'
    });
}

module.exports = {
    register,
    login,
    profile,
    logout

}