const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(express.json());


const dbConnect = require('./config/database');
dbConnect();  

//or
// require('./config/database').dbConnect();

const user = require('./routes/user');
app.use('/api/v1',user);

app.listen(PORT, (req,res) => {
    console.log(`App running on port number ${PORT}`);
})