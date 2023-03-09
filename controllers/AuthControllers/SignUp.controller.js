const AuthModels = require('../../models/users.schema');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const SignUpHandler = (req, res)=>{
    const {username, password, email} = req.body;
    if(!username || !password){
        res.json({
            msg: 'Username and password cannot be blank',
            token: null
        });
    }
    else if(password.length < 8){
        res.json({
            msg: 'Password must have at least 8 characters',
            token: null
        });
    }
    else{
        AuthModels.findOne({username}).then((data)=>{
            if(data){
                res.status(403).json({
                    msg: "Username is unavailable",
                    token: null
                })
            }
            else{
                bcrypt.genSalt(saltRounds,(err, salt) => {
                    if(!err){
                        bcrypt.hash(password, salt, (err, encodedPassword) => {
                            if(!err){
                                const newToken = jwt.sign({
                                    username: username,
                                    email: email,
                                    password: encodedPassword
                                }, process.env.JWT_SECRET_KEY)
                                const NewAccount = new AuthModels({
                                    _id: new mongoose.Types.ObjectId(),
                                    username: username,
                                    email: email,
                                    password: encodedPassword
                                });
                                NewAccount.save().then(()=>{
                                    res.status(200).json({
                                        msg: 'Sign up successfully',
                                        token: newToken,
                                        email: email,
                                        username: username,
                                        id: NewAccount._id
                                    })
                                }).catch((err)=>{
                                    res.status(500).json({
                                        msg: 'Server error',
                                        token: null
                                    })
                                });
                            }
                            else {
                                res.status(500).json({
                                    msg: err,
                                    token: null
                                })
                            }
                        });
                    }
                    else {
                        res.status(500).json({
                            msg: err,
                            token: null
                        })
                    }
                });
            }
        })
        

    }
}

module.exports = SignUpHandler;