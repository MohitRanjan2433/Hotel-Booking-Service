const jwt = require("jsonwebtoken");
require("dotenv").config();

// Define your admin email in the environment variables or directly here
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "mohit2433@gmail.com";

exports.auth = (req, res, next) => {
    try {
        // Extract JWT token from headers
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }

        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // Attach payload to request object
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token is invalid or something went wrong while verifying the token',
        });
    }
};

exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.email !== ADMIN_EMAIL){
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to perform this action',
            });
        }
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "User role is not matching",
        });
    }
};