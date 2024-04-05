// Import mongoose
const mongoose = require('mongoose');

// Route handler
const commentSchema = new mongoose.Schema(
    {
        post:{
            // Indicate the id of other model
            type : mongoose.Schema.Types.ObjectId,
            ref: "Post", // Reference to the post model
        },

        user: {
            type:String,
            required:true
        },

        body : {
            type : String,
            required: true
        }
    }
)

// Export
module.exports = mongoose.model("Comment", commentSchema)