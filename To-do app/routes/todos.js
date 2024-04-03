const express = require("express");
const router = express.Router();

//Importing controller
const {createTodo} = require("../controllers/createTodo");

// Defining API routes
router.post("/createTodo", createTodo);

module.exports = router;