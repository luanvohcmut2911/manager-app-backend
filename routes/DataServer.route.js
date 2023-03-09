const express = require('express');
const route = express.Router();
const [getDataGenre, addData, deleteData] = require('../controllers/DataControllers/Data.controller');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
const upload = multer({ storage: storage });


route.get('/getData', getDataGenre);
route.post('/addData', upload.single('image') ,addData);
route.delete('/deleteData', deleteData);

module.exports = route;