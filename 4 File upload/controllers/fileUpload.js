const File = require('../models/File');
const cloudinary = require("cloudinary").v2;

// localFileUpload route handler
exports.localFileUpload = async(req, res) => {
    try {
        // fetch files
        const file = req.files.file;
        console.log("FILE -> ", file);

        // Create path where file need to be stored on server
        // varName = curr_directory + files + curr-date + extension
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -> ", path);

        // Move file to server OR Add path to move function
        file.mv(path, (err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:"Local file uploaded successfully"
        })

    } catch (error) {
        console.log(error);
    }
}
/*
async function uploadFileToCloudinary(file, folder){
    const options = {folder};
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

The error message , "Invalid image file", suggests that Cloudinary is expecting an image file but is instead receiving a video file. This happens because Cloudinary automatically detects the file type based on its contents, and if it detects a video file but receives an image file, it throws an error.

To resolve this issue, make sure that you're properly handling video files in your uploadFileToCloudinary function. So, mention resourceType = auto
*/

// async function uploadFileToCloudinary(file, folder, resourceType = "auto"){
//     const options = {folder, resource_type: resourceType};
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }


// or 

// image size also reduce by decreasing width and height size
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder, resource_type:"auto"};

    if (quality !== undefined && quality >= 0 && quality <= 100) {
        options.quality = quality;
    }

    // if(height !== undefined){
    //     options.height = height;
    // }

    // if(width !== undefined){
    //     options.width = width
    // }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async(req, res) => {
    try {
        // Fetch data
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        
        const file = req.files.imageFile;

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        
        const fileFormat = file.name.split('.')[1].toLowerCase();
        
        // File format not supported
        if(!supportedTypes.includes(fileFormat)){
            return res.status(400).json({
                success:false,
                message: "File format not supported"
            })
        }
        
        // upload on cloudinary
    
        const response = await uploadFileToCloudinary(file, "Demo-Folder", "image");
        console.log(response);
     
        // Create entry in database
        const fileData = await File.create({
            name, tags, email, imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Image uploaded successfully"
        })

    } catch (error) {
        console.log(error);

        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.videoUpload = async(req,res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        const supportedTypes = ['mp4','mkv','mov']; 

        const fileFormat = file.name.split('.')[1].toLowerCase();
        
        // File format not supported
        if(!supportedTypes.includes(fileFormat)){
            return res.status(400).json({
                success:false,
                message: "File format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file, "Demo-Folder", "video");
        console.log(response);

        const fileData = await File.create({
            name, tags, email, imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Video uploaded successfully"
        })

    } catch (error) {
        console.log("Error - During uploading video");
        console.log(error);

        res.status(400).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.imageSizeReducer = async(req,res) => {
    try {
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;

        //Validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        
        const fileFormat = file.name.split('.')[1].toLowerCase();
        
        // File format not supported
        if(!supportedTypes.includes(fileFormat)){
            return res.status(400).json({
                success:false,
                message: "File format not supported"
            })
        }
        
        // upload on cloudinary
                                                                   //    quality         
        const response = await uploadFileToCloudinary(file, "Demo-Folder", 40);
        console.log(response);
     
        // Create entry in database
        const fileData = await File.create({
            name, tags, email, imageUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Image uploaded successfully"
        })


    } catch (error) {
        console.log("Error - During reducing size of image");
        console.log(error);

        res.status(400).json({
            success:false,
            message:"Something went wrong while reducing size"
        })
    }
}