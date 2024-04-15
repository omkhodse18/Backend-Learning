// https://www.npmjs.com/package/cloudinary
// https://cloudinary.com/documentation/node_integration

const cloudinary = require('cloudinary').v2;
require('dotenv').config();
/*
    ==> Setting configuration parameters globally
    Here's an example of setting configuration parameters globally in your Node application:

    cloudinary.config({ 
    cloud_name: 'sample', 
    api_key: '874837483274837', //dummy
    api_secret: 'a676b67565c6767a6767d6767f676fe1' //dummy
    }); 
*/

exports.cloudinaryConnect = () => {
    try {
        // cloud_name : process.env.CLOUD_NAME;
        // api_key: process.env.API_KEY;
        // api_secret: process.env.API_SECRET;
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
    } catch (error) {
        console.log(error);
    }
}

