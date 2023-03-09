const AuthModels = require('../../models/users.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AuthHandler = (req, res) => {
    const { username, password } = req.body;
    AuthModels.findOne({
        username
    }).then((result)=>{
        if(result){
            bcrypt.compare(password, result.password, (err, valid) => {
                if(!err){
                    if(valid){
                        const newToken = jwt.sign({
                            username: username,
                            password: password
                        }, process.env.JWT_SECRET_KEY);
                        res.status(200).json({
                            msg: "Login successfully",
                            token: newToken,
                            username: username,
                            email: result.email,
                            id: result._id
                        })
                    }
                    else{
                        res.status(403).json({
                            msg: "Password incorrectly",
                            token: null
                        })
                    }
                }
            });
        }
        else{
            res.status(403).json({
                msg: "Can not find this account",
                token: null
            })
        }
    }).catch((err)=>{
        res.status(403).json({
            msg: err,
            token: null
        })
    })  
}


module.exports = AuthHandler;