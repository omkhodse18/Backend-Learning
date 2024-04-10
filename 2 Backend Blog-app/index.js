const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Middleware for body parser
app.use(express.json());


const blogs = require('./routes/blogs');
// Middleware for mounting or adding
app.use("/api/v1",blogs);


const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => console.log("Server running successfully"))

app.get("/",(req,res) => {
    res.send("<h1>This is Home Page</h1>")
})