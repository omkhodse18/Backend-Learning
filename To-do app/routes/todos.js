const express = require("express");
const router = express.Router();

//Importing controller
const {createTodo} = require("../controllers/createTodo");
const {getTodos, getTodosById} = require("../controllers/getTodos");
const {updateTodo} = require("../controllers/updateTodo");

// Defining API routes
router.post("/createTodo", createTodo);

// Get data
router.get('/getTodos', getTodos)

// Get by ID
router.get('/getTodos/:id', getTodosById);


module.exports = router;