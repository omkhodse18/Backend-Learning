const Post = require('../models/postModel');
const Like = require('../models/likeModel');

exports.likePost = async(req,res) =>{
    try {
        const {post,user} = req.body;
        const like = new Like({
            post, user
        })    

        const savedLike = await like.save();

        // Update the post collection basis on this
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes:savedLike._id}}, {new:true})
            .populate("likes")
            .exec();


        res.json(
            {
                post : updatedPost
            }
        )
    } 
    catch (error) {
        return res.status(500).json({
            error : "Error occured while liking post" + error
        })
    }
}

// Get all likes
exports.getAllLikes = async(req,res) => {
    try {
        const likes = await Like.find();

        res.json({
            like:likes
        })
    } 
    catch (error) {
        return res.status(500).json({
            error : "Error occured while fetching liked post" + error
        })
    }
}

// UNLIKE A POST
exports.unlikePost = async(req,res) =>{
    try {
        const {post, like} = req.body;
        // Delete like from the likes array
        const deleteLike = await Like.findByIdAndDelete({post:post,_id:like});

        // we have remove the like so update it in post collection also
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull : {likes: deleteLike.id}}, {new:true});

        res.json({
            post : updatedPost
        })
    } 
    catch (error) {
        return res.status(500).json({
            error : "Error occured while unliking post " + error
        })
    }
}