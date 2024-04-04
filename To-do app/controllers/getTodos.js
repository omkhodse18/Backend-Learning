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