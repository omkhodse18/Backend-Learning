const express = require('express');
const router = express.Router();

// Mapping
const {imageUpload, videoUpload, imageSizeReducer, localFileUpload} = require('../controllers/fileUpload');


// API route
router.post('/localFileUpload', localFileUpload); 
router.post('/imageUpload', imageUpload); 
router.post('/videoUpload', videoUpload); 
router.post('/imageSizeReducer', imageSizeReducer); 


module.exports = router;