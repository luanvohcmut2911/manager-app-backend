const mongoose = require('mongoose');


const DataModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title:{
    type: String,
    require: true,
    default: null
  },
  description:{
    type: String,
    require: true,
    default: null
  },
  image:{
    data: Buffer,
    contentType: String
  },
  type:{
    type: String,
    require: true,
    default: null
  },
  userID:{
    type: String,
    require: true,
    default: null
  }
}, {
  collection: 'Data'
});
module.exports = mongoose.model('Data', DataModel);