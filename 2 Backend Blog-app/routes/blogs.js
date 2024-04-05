const express = require('express');
const router = express.Router();

//import controller
const {dummy} = require('../controllers/LikeController')
const {createComment} = require('../controllers/commentController');
const {createPost, getAllPosts} =require("../controllers/PostController");
const {likePost, getAllLikes} = require('../controllers/LikeController');

// Mapping create
// router.get("/dummyRoutes",dummy);
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like", likePost);
router.get("/likes", getAllLikes);


// Export
module.exports = router;