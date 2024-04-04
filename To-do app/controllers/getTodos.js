//importing model
const Todo = require('../models/Todo');

exports.getTodos = async(req,res) => {
    try{
        //Fetch all todo items from database
        const todos = await Todo.find({});

        //Response
        res.status(200).json({
            success : true,
            data:todos,
            message:"Entire todo items fetch"
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


// For getTodosById, you can also write a seperate controller
exports.getTodosById = async(req, res) => {
    try {
        // Extract todo items basis on ID
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});

        //Data for given id is not found
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"No data found for given id"
            })
        }
        
        res.status(200).json({
            success:true,
            data: todo,
            message: `Data for ${id} found successfully`
        })
    } 
    catch(error) {
        console.error(error);

        res.status(500).json({
            success:false,
            error : error.message,
            message:"Internal server error"
        })
    }
}