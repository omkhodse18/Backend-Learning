const express = require('express');
const router = express.Router();

const {login, signup} = require('../controllers/Auth');
const {auth, isStudent, isAdmin} = require('../middleware/Auth');

router.post('/login',login);
router.post('/signup', signup);


// Testing protected routes for single middleware
router.get('/test', auth, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to TESTS"
    })
})

// Protected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to student"
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success:true,
        message:"Welcome to Admin"
    })
})

module.exports = router;
