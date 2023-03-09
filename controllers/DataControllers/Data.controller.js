const DataModel = require('../../models/data.schema');
const mongoose = require('mongoose');
const fs = require('fs');
const Buffer = require('buffer');
const path = require('path');

const getDataGenre = (req, res)=>{
  const {genre, userID} = req.query;
  DataModel.find({
    userID: userID,
    type: genre
  }).then((result)=>{
    res.status(200).json({
      msg:'Get data successfully',
      data: result
    })
  })
};

const addData = (req, res)=>{
  const { title, description, type, userID} = req.body;
  const objImage = {
    data: fs.readFileSync(path.join(__dirname + "../../../uploads/" + req.file.filename)),
    contentType: 'image/png'
  }
  const newData = new DataModel({
    _id: new mongoose.Types.ObjectId(),
    title: title,
    image: objImage,
    description: description,
    type: type,
    userID: userID
  });
  newData.save().then(()=>{
    res.status(200).json({
      msg: "Add new data successfully"
    })
  }).catch((err)=>{
    res.status(500).json({
      msg: err
    })
  });
}

const deleteData = (req, res)=>{
  const { title, description, type, userID} = req.query;
  DataModel.deleteOne({
    title: title,
    description: description,
    type: type,
    userID: userID
  }).then(()=>{
    res.status(200).json({
      msg: 'Deleted successfully'
    })
  }).catch((err)=>{
    res.status(500).json({
      msg:'Error',
      error: err
    })
  })
}

module.exports = [getDataGenre, addData, deleteData];