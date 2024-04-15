const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    imageUrl:{
        type:String
    },

    tags:{
        type:String,
    },
    email:{
        type:String
    }

})

// module.exports = mongoose.model("File", fileSchema);

// Another way

const File = mongoose.model("File", fileSchema);
module.exports = File