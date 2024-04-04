const express = require("express");
const router = express.Router();

//Importing controller
const {createTodo} = require("../controllers/createTodo");
const {getTodos, getTodosById} = require("../controllers/getTodos");
const {updateTodo} = require("../controllers/updateTodo");
const {deleteTodo} = require("../controllers/deleteTodo");

// Defining API routes
router.post("/createTodo", createTodo);

// Get data
router.get('/getTodos', getTodos)

// Get by ID
router.get('/getTodos/:id', getTodosById);

// Update by ID
router.put('/updateTodo/:id', updateTodo);

//Delete by ID
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router;