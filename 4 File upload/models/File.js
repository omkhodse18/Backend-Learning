const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String
    },

    tags:{
        type:String,
    },
    email:{
        type:String
    }

})

// Post middleware
// Here doc is entry which store in database
fileSchema.post("save", async function(doc){
    try {
        console.log("DOC -> ",doc);

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

        // send mail
        let info = await transporter.sendMail({
            from: 'OmiKhodse',
            to: doc.email,
            subject: "New file uploaded on Cloudinary",
            html: `<h1>File uploaded successfully</h1> View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })

        console.log("INFO -> ",info);

    } catch (error) {
        console.log(error);
    }
})



// module.exports = mongoose.model("File", fileSchema);
// Another way
const File = mongoose.model("File", fileSchema);
module.exports = File