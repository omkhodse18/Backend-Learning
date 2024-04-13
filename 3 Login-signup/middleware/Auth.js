// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.auth = (req, res) => {
    try {
        // Extract jwt token
        const token = req.body.token; 

        // Token unavailable
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token missing"
            })
        }
        
        // token verification
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid"
            })
        }
        
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while decoding token"
        })
    }
}

exports.isStuden = (req, res, next) => {
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for student"
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role is not matching"
        })
    }
}