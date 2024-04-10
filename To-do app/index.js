const express = require('express');
// import express from 'express'
const app = express();

// Load config from env file
require("dotenv").config(); // It loads the configuration present in .env files to PROCESS object 

// Ya to port no process.env se aayega || if any reason nahi aaya to default 4000 or any will be used
const PORT = process.env.PORT || 4000;

// Middleware to parse json request body
app.use(express.json());

// Import routes for todo API
const todoRoutes = require("./routes/todos");

// Mounting(Adding/Apendng) the todo API routes || Base url ke sath /api/v1 mapping kiya hain
app.use("/api/v1", todoRoutes);

// starting server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

// DB connection
const dbConnect = require("./config/database");
dbConnect();

// Default route
app.get("/" , (req,res) => {
    res.send(`<h1>This is HOME page</h1>`)
})