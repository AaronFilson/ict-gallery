const mongoose = require('mongoose');

var gallerySchema = new mongoose.Schema({
  name: String,
  topic: String,
  caption: String,
  description: String,
  mainImg: {type: String, default: '/img/salmons.gif'},
  subImg1: {type: String, default: '/img/bears.jpg'},
  subImg2: String,
  subImg3: String,
  subImg4: String,
  subImg5: String,
  subImg6: String,
  subImg7: String,
  subImg8: String,
  userId: String
});

module.exports = exports = mongoose.model('Gallery', gallerySchema);
