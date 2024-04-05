const express = require('express');
const router = express.Router();

//import controller
const {dummy} = require('../controllers/LikeController')
const {createComment} = require('../controllers/commentController');
const {createPost} =require("../controllers/PostController");

// Mapping create
// router.get("/dummyRoutes",dummy);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);


// Export
module.exports = router;