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

async function uploadFileToCloudinary(file, folder){
    const options = {folder};
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
    
        const response = await uploadFileToCloudinary(file, "Demo-Folder");
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