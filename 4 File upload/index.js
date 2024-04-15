// app create
const express = require('express')
const app = express()

// PORT
require('dotenv').config();
PORT = process.env.PORT || 8000;

// MIDDLEWARE
app.use(express.json());

// Middleware to upload files on server
const fileupload = require("express-fileupload");
// app.use(fileupload()); 
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// DB connect
const dbConnect = require('./config/database')
dbConnect();

// Cloud connect
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

// API route mount
const router = require('./routes/FileUpload');
app.use('/api/v1', router);

// Activate server
app.listen(PORT, (req,res) => {
    console.log(`App successfully started on PORT : ${PORT}`);
})