const express = require('express');
const router = express.Router();
const AuthHandler = require('../controllers/AuthControllers/Auth.controller');
const SignUpHandler = require('../controllers/AuthControllers/SignUp.controller');
const jwt = require('jsonwebtoken');

const checkAuthenticated = (req, res, next)=>{
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, encoded)=>{
        if(!err){
            next();
        }
        else{
            res.status(403).json({
                msg: "You must log in or sign up before!",
                error: err
            })
        }
    })
}

router.post('/login', AuthHandler);
router.post('/signup', SignUpHandler);
router.post('/refreshToken')
router.get('/home',checkAuthenticated, (req, res)=>{
    res.status(200).json({
        msg: 'Authenticated. Welcome to homepage'
    })
})

module.exports = router;