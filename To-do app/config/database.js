require("dotenv").config();
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(DATABASE_URL)
    .then(() => console.log("Database connected successfully") )
    .catch((error) => {
        console.log("Oops! error occured.")
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;