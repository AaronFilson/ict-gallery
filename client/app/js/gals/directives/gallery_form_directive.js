module.exports = function(app) {
  app.directive('galleryForm', function() {
    return {
      restrict: 'EAC',
      replace: true,
      transclude: true,
      templateUrl: '/templates/gals/directives/gallery_form_directive.html',
      scope: {
        buttonText: '@',
        gallery: '=',
        save: '&'
      },
      controller: function($scope) {
        $scope.gallery = $scope.gallery || {mainImg: '/img/salmons.gif'};
      }
    };
  });
};
