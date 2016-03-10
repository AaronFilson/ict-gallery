var angular = require('angular');

module.exports = function(app) {
  app.controller('GalsController', ['$scope', '$http', 'cfResource', function($scope, $http, Resource) {
    $scope.gals = [];
    $scope.errors = [];
    var galleryService = Resource('/gals');

    $scope.dismissError = function(err) {
      $scope.errors.splice($scope.errors.indexOf(err), 1);
    };

    $scope.toggleEdit = function(gallery) {
      if (gallery.backup) {
        var temp = gallery.backup;
        $scope.gals.splice($scope.gals.indexOf(gallery), 1, temp);
      } else {
        gallery.backup = angular.copy(gallery);
        gallery.editing = true;
      }
    };

    $scope.getAll = function() {
      galleryService.getAll(function(err, res) {
        if (err) return console.log(err);
        $scope.gals = res;
      });
    };

    $scope.createGallery = function(gallery) {
      $scope.gals.push(gallery);
      galleryService.create(gallery, function(err, res) {
        if (err) {
          $scope.gals.splice($scope.gals.indexOf(gallery), 1);
          $scope.errors.push('Could not save gallery with name of ' + gallery.name);
          return console.log(err);
        }
        $scope.gals.splice($scope.gals.indexOf(gallery), 1, res);
        $scope.newGallery = null;
      });
    };

    $scope.deleteGallery = function(gallery) {
      if (!gallery._id) return setTimeout(function() {$scope.deleteGallery(gallery);}, 1000);
      galleryService.delete(gallery, function(err, res) {
        if (err) {
          $scope.errors.push('could not delete gallery ' + gallery.name);
          return console.log(err);
        }
        $scope.gals.splice($scope.gals.indexOf(gallery), 1);
      });
    };

    $scope.updateGallery = function(gallery) {
      galleryService.update(gallery, function(err, res) {
        gallery.editing = false;
        gallery.backup = null;
        if (err) {
          $scope.errors.push('could not update gallery ' + gallery.name);
          return console.log(err);
        }
      });
    };
  }]);
};
