require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var upload = multer({dest: './uploads'});
var cloudinary = require('cloudinary');
var fs = require('fs');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('myFile'), function(req, res){
  // upload that image to cloudinary
  cloudinary.uploader.upload(req.file.path, function(result){
    fs.unlink(req.file.path, function(err){
      if(err){
        res.send(err);
      } else{
        res.send('image was uploaded to cloudinary and deleted locally');
      }
    });
  });
});

app.listen(3000);
