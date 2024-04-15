const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE_URL = process.env.DATABASE_URL || 8000;

const dbConnect = () => {
    mongoose.connect(DATABASE_URL)
    .then(() => "DB conneced successfully")
    .catch(() => {
        console.log("OOPS! Error while connecting DB");
        process.exit(1);
    });
}

module.exports = dbConnect;