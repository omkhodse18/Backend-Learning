//importing model
const Todo = require('../models/Todo');

exports.deleteTodo = async(req,res) => {
    try{
        const {id} = req.params;
        await Todo.findByIdAndDelete(id);

        res.json({
            success:true,
            message:`Data of id ${id} is deleted successfully`
        })

    }
    catch(error){
        console.error(error);

        res.status(500).json({
            success:false,
            error : error.message,
            message:"Internal server error"
        })
    }
}