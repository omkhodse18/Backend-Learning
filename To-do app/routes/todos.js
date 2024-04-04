const express = require("express");
const router = express.Router();

//Importing controller
const {createTodo} = require("../controllers/createTodo");
const {getTodos} = require("../controllers/getTodos");

// Defining API routes
router.post("/createTodo", createTodo);

// Get data
router.get('/getTodos', getTodos)

module.exports = router;