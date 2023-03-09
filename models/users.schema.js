const mongoose = require('mongoose');


const UsersModel = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    email:{
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, {
    collection: 'Users'
})

module.exports = mongoose.model('Users', UsersModel);