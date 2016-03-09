module.exports = function(app) {
  app.controller('authController', ['$scope', 'galleryAuth', function($scope, galleryAuth) {
    $scope.username = null;

    $scope.updateUsername = function() {
      galleryAuth.getUsername(function(res) {
        console.log(res);
        $scope.username = res.data.username;
      });
    };

    $scope.logout = function() {
      galleryAuth.signOut(function() {
        $scope.username = null;
      });
    };
  }]);
};
