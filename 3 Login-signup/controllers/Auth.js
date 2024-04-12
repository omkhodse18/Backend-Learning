const bcrypt = require("bcrypt");
const User = require("../model/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Signup route handler
exports.signup = async(req,res) => {
    try{
        // get data
        const {name, email, password, role} = req.body;
        
        //check if user exist
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }

        //Password secure using hashing
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'Error in hashing password'
            });
        }
        

        // Create entry for user
        const user = await User.create({
            name, email, password:hashedPassword,role
        })


        return res.status(200).json({
            success:true,
            message:"User created successfully"
        })
    }
    catch(error){
        console.error(error);
        return res,status(500).json({
            success:false,
            message:"User cannot be registered, please try again letter"
        })
    }
}

////// Login handler

exports.login = async(req, res) => {

    try{
        // Extracting email and pass from login req body
        const {email, password} = req.body;
        
        // If email or pass is empty
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details carefully."
            });
        }

        // Checking if user entry is in database
        let user = await User.findOne({email});
        //If not a registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered."
            });
        }

        const payload = {
            email: user.email,
            id : user._id,
            role: user.role
        }
        // Password verification and Generating JWT token
        if(await bcrypt.compare(password, user.password) ){
            //Password match

            // Creating JWT token using sign method
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2hr",
                                }
            );
            
            user = user.toObject();

            user.token = token;
            user.password = undefined;

            const options = {
                expires:new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully"
            })
        }
        else{
            // Password do not match
            return res.status(403).json({
                success:false,
                message:"Password does not match."
            });
        }


    } 
    catch(error) {
        console.log(error);

        return res.status(500).json({
            success:false,
            message:"Login failure"
        });
    }
}