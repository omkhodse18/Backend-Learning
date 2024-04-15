const File = require('../models/File')

// localFileUpload route handler
exports.localFileUpload = async(req, res) => {
    try {
        // fetch files
        const file = req.files.file;
        console.log("FILE -> ", file);

        // Path of server to store the file
        // varName = curr_dir + files + curr-date + extension
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -> ", path);

        // Move file to server
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