const express = require('express');
const jsonParser = require('body-parser').json();
const Gallery = require(__dirname + '/../models/gallery');
const handleDBError = require(__dirname + '/../lib/handle_db_error');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

var galleryRouter = module.exports = exports = express.Router();

galleryRouter.get('/gals', (req, res) => {
  Gallery.find({}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

galleryRouter.get('/mygals', jwtAuth, (req, res) => {
  Gallery.find({userId: req.user.id}, (err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });

});

galleryRouter.post('/gals', jwtAuth, jsonParser, (req, res) => {
  var newGallery = new Gallery(req.body);
  newGallery.userId = req.user.id;
  newGallery.save((err, data) => {
    if (err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

galleryRouter.put('/gals/:id', jwtAuth, jsonParser, (req, res) => {
  var galleryData = req.body;
  delete galleryData._id;
  Gallery.update({_id: req.params.id}, galleryData, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'Success'});
  });
});

galleryRouter.delete('/gals/:id', jwtAuth, (req, res) => {
  Gallery.remove({_id: req.params.id}, (err) => {
    if (err) return handleDBError(err, res);

    res.status(200).json({msg: 'Success'});
  });
});
