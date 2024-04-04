//importing model
const Todo = require('../models/Todo');

exports.updateTodo = async(req,res) => {
    try{
        //Another way to find id
        const {id} = req.params;
        const {title, description} = req.body;

        const todo = await Todo.findByIdAndUpdate(
            {_id:id},
            {title, description, updatedAt : Date.now()}
        )

        //Response
        res.status(200).json({
            success : true,
            data:todo,
            message:"Updated successfully"
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