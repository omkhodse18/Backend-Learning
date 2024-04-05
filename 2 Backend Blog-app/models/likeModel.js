// Import mongoose
const mongoose = require('mongoose');

// Route handler
const likeSchema = new mongoose.Schema(
    {
        post:{
            // Indicate the id of other model
            type :mongoose.Schema.Types.ObjectId,
            ref: "Post", // Reference to the post model
        },

        user: {
            type:String,
            required:true
        },
    }
)

module.exports = mongoose.model("Like", likeSchema);