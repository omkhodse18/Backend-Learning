// Import comment and post model
const Comment = require('../models/commentModel');
const Post = require('../models/postModel')

exports.createComment = async(req, res) => {
    try {
        // Alternate way to create entry rather then model_name.create() we will use save().
        // But while using save make sure that, -> Object is ready (in this case ; comment object)

        //fetch data from req body
        const {post, user,body} = req.body;

        // create comment obj 
        const comment = new Comment({
            post, user, body
        });

        //Save new comment into database
        const savedComment = await comment.save();
        
        //find post using ID, and then add the new comment to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push : {comments:savedComment._id} } , {new:true})
            .populate("comments")   //Populate the comments array with comment documents
            .exec()
        
        res.json({
            post : updatedPost,
        });
    } 
    catch(error){
        return res.status(500).json({
            error : "Error occured " + error
        })
    }
}
