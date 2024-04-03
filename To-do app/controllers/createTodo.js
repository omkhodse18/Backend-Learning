//importing model
const Todo = require('../models/Todo');

//Define route handler

exports.createTodo = async(req,res) => {
    try {
        // Extracting title and description from request body
        const {title, description} = req.body;

        // Creating a new todo object and insert in DB
        const response = await Todo.create({title,description});
        
        // Sending JSON response with success flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: "Entry created successfully."
            }
        );

    } catch (error) {
        console.log("Something went wrong");
        console.error(error);

        res.status(500).json(
            {
                success: false,
                data: "Internal server error",
                message: error.message
            }
        )
    }

}