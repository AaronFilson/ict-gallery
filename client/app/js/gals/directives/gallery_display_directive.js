module.exports = function(app) {
  app.directive('gallery', function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/templates/gals/directives/gallery.html',
      scope: {
        galleryData: '='
      }
    };
  });
};
