module.exports = function(app) {
  require('./controllers/gals_controller')(app);

  require('./directives/gallery_display_directive')(app);
  require('./directives/gallery_form_directive')(app);

  // require('./directives/simg_directive')(app);
};
