const express = require('express');
const router = express.Router();

// Mapping
const {imageUpload, videoUpload, imgReducerUpload, localFileUpload} = require('../controllers/fileUpload');


// API route
router.post('/localFileUpload', localFileUpload); 

module.exports = router;