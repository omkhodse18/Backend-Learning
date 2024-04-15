const File = require('../models/File')

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